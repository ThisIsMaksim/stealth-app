import { observer } from "mobx-react"
import { useCallback, useEffect, useState } from "react"
import { Button, TextArea, ToastProps, useToaster } from '@gravity-ui/uikit'
import { useStores } from "../../stores"
import { ModalType } from "../../stores/modal.store"
import { IApprovePostRequest, IRejectPostRequest } from "../../stores/posts.store"
import { IComment } from "../../types/Post.type"
import { fetchWithDelay, Action } from "../../utils/fetchWithDelay"

interface CommentProps {
    postId: string
    comment: IComment
}

export const Comment = observer(({postId, comment}: CommentProps) => {
    const { UserStore, ModalStore, PostsStore } = useStores()
    const [text, setText] = useState(comment.content)
    const [isApprovePending, setApprovePending] = useState(false)
    const [isRejectPending, setRejectPending] = useState(false)
    const {add} = useToaster()

    const openBindLinkedInAccountModal = useCallback(() => {
        ModalStore.open(
            ModalType.BindLinkedInAccount,
            {
              locations: UserStore.locations,
            },
            () => UserStore.needCheckLinkedinAccountStatus = false
          )
    }, [ModalStore, UserStore])

    const handleApprove = useCallback(async () => {
        if (!UserStore.user.linkedin_account) {
            openBindLinkedInAccountModal()
    
          return
        }
    
        setApprovePending(true)

        const request = {
            postId: postId,
            commentId: comment.id,
            comment: text,
            reaction: undefined
        }
    
        const result = await fetchWithDelay<IApprovePostRequest, Action<string>>(
            PostsStore.approvePost.bind(PostsStore),
            request,
        )

        setApprovePending(false)
    
        PostsStore.changePostStatus(postId, 'pending')

        const toast: ToastProps = !result.error
            ? {
                name: 'succes approve comment',
                title: 'Comment sent for publication',
                content: 'This usually happens quickly, but can take up to 15 minutes',
                theme: 'success',
            }
            : {
                name: 'failed approve comment',
                title: 'Failed to publish comment',
                content: 'Please try again later',
                theme: 'danger',
            }
    
            add(toast)
    }, [PostsStore, postId, comment, text])

    const handleReject = useCallback(async () => {
        if (!UserStore.user.linkedin_account) {
            openBindLinkedInAccountModal()
    
          return
        }
    
        setRejectPending(true)

        const request = {
            postId: postId,
            commentId: comment.id,
        }
    
        const result = await fetchWithDelay<IRejectPostRequest, Action<string>>(
            PostsStore.rejectPost.bind(PostsStore),
            request,
        )

        setRejectPending(false)
    
        PostsStore.changePostStatus(postId, 'rejected')

        const toast: ToastProps = !result.error
            ? {
                name: 'succes reject comment',
                title: 'Comment was rejected',
                theme: 'success',
            }
            : {
                name: 'failed reject comment',
                title: 'Failed to reject comment',
                content: 'Please try again later',
                theme: 'danger',
            }
    
            add(toast)
    }, [PostsStore, postId, comment, text])

    const handleRegenerate = useCallback(() => {
        if (!UserStore.user.linkedin_account) {
            openBindLinkedInAccountModal()
    
          return
        }
    
        ModalStore.open(ModalType.RemakeComment, {
          postId: postId,
          comment: comment,
        })
      }, [ModalStore, comment, postId])

    useEffect(() => {
        setText(comment.content)
    }, [comment.content])

    return (
        <>
            <TextArea
                className="bg-white dark:bg-black rounded-md"
                size="l"
                minRows={6}
                maxRows={16}
                value={text}
                onUpdate={(value) => setText(value)}
            />
            <div className="flex gap-2 mt-4">
                <Button view="outlined-success" size="l" loading={isApprovePending} disabled={isApprovePending || isRejectPending} onClick={handleApprove}>
                    Approve
                </Button>
                <Button view="outlined-danger" size="l" loading={isRejectPending} disabled={isApprovePending || isRejectPending} onClick={handleReject}>
                    Reject
                </Button>
                <Button view="outlined-action" size="l" disabled={isApprovePending || isRejectPending} onClick={handleRegenerate}>
                    Regenerate
                </Button>
            </div>
        </>
    )
})