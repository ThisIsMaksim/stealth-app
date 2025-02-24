import {Button, Card, CardContent, CardDescription, CardTitle, Textarea, toast} from "keep-react"
import {useCallback, useEffect, useRef, useState} from "react"
import {IComment} from "../../../types/Post.type.ts"
import {ArrowsClockwise, CheckCircle, XCircle} from "phosphor-react"
import {useStores} from "../../../stores"
import {Action, fetchWithDelay} from "../../../utils/fetchWithDelay.ts"
import {IApprovePostRequest, IRejectPostRequest} from "../../../stores/posts.store.ts"
import {ModalType} from "../../../stores/modal.store.ts"
import {observer} from "mobx-react"
import funny from '../../../assets/reactions/linkedin-funny-emoticon-250.png'
import insightful from '../../../assets/reactions/Linkedin-Insightful-Icon-Lamp250.png'
import love from '../../../assets/reactions/Linkedin-Love-Icon-Heart250.png'
import heartinHand from '../../../assets/reactions/Linkedin-Support-Icon-HeartinHand250.png'
import clappingHands from '../../../assets/reactions/Linkedin-Celebrate-Icon-ClappingHands250.png'
import like from '../../../assets/reactions/Linkedin-Like-Icon-Thumbup250.png'

interface Props {
  index: number
  postId: string
  comment: IComment
}

export const Comment = observer(({ index, postId, comment }: Props) => {
  const {PostsStore, ModalStore} = useStores()
  const [isPending, setPending] = useState(false)
  const [value, setValue] = useState<string>(comment.content)
  const [reaction, setReaction] = useState<string>('')
  const commentMaxLength = useRef(500)

  const handleApprove = useCallback(() => {
    setPending(true)

    // eslint-disable-next-line no-async-promise-executor
    const promise = () => new Promise<void>(async (resolve, reject) => {
      const result = await fetchWithDelay<IApprovePostRequest, Action<string>>(
        PostsStore.approvePost.bind(PostsStore),
        {
          postId: postId,
          commentId: comment.id,
          comment: value,
          reaction
        }
      )

      PostsStore.changePostStatus(postId, 'pending')

      setPending(false)

      if (result.error) {
        reject()
      } else {
        resolve()
      }
    })

    toast.promise(promise, {
      loading: 'Approving...',
      success: 'Approved',
      error: 'Something went wrong',
    })
  }, [PostsStore, postId, comment, value, reaction])

  const handleReject = useCallback(() => {
    setPending(true)

    // eslint-disable-next-line no-async-promise-executor
    const promise = () => new Promise<void>(async (resolve, reject) => {
      const result = await fetchWithDelay<IRejectPostRequest, Action<string>>(
        PostsStore.rejectPost.bind(PostsStore),
        {
          postId: postId,
          commentId: comment.id,
        }
      )

      PostsStore.changePostStatus(postId, 'rejected')

      setPending(false)

      if (result.error) {
        reject()
      } else {
        resolve()
      }
    })

    toast.promise(promise, {
      loading: 'Rejecting...',
      success: 'Rejected',
      error: 'Something went wrong',
    })
  }, [PostsStore, comment, postId])

  const handleRemake = useCallback(() => {
    ModalStore.open(ModalType.RemakeComment, {
      postId: postId,
      comment: comment,
    })
  }, [ModalStore, comment, postId])

  const handleReactionClick = useCallback((id: string) => {
    setReaction(reaction === id ? '' : id)
  }, [reaction])

  useEffect(() => {
    setValue(comment.content)
  }, [comment.content])

  return (
    <Card id={`comment-${index}`} className="w-full max-w-full text-start">
      <CardContent className="max-md:p-4 bg-gray-100 dark:bg-gray-700">
        <CardTitle>
          {comment.status === 'draft' ? 'Suggested comment' : 'Your comment'}
        </CardTitle>
        <CardDescription>
          <Textarea
            id="message"
            className="mt-2 p-4 rounded-xl"
            value={value}
            placeholder="Write your information about You"
            rows={8}
            maxLength={commentMaxLength.current}
            disabled={comment.status !== 'draft'}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="w-full flex justify-end">
            <p className="text-body-4 font-normal text-metal-300">
              {`${value.length}/${commentMaxLength.current}`}
            </p>
          </div>
        </CardDescription>
        <Card className="max-w-[250px]">
          <CardContent className="flex flex-row gap-1 p-2">
            <Button variant="softBg" color={reaction === 'like' ? 'success' : 'secondary'} shape="icon" onClick={() => handleReactionClick('like')}>
              <img
                src={like}
                width="32"
                alt="reaction"
              />
            </Button>
            <Button variant="softBg" color={reaction === 'praise' ? 'success' : 'secondary'} shape="icon" onClick={() => handleReactionClick('praise')}>
              <img
                src={clappingHands}
                width="32"
                alt="reaction"
              />
            </Button>
            <Button variant="softBg" color={reaction === 'appreciation' ? 'success' : 'secondary'} shape="icon" onClick={() => handleReactionClick('appreciation')}>
              <img
                src={heartinHand}
                width="32"
                alt="reaction"
              />
            </Button>
            <Button variant="softBg" color={reaction === 'empathy' ? 'success' : 'secondary'} shape="icon" onClick={() => handleReactionClick('empathy')}>
              <img
                src={love}
                width="32"
                alt="reaction"
              />
            </Button>
            <Button variant="softBg" color={reaction === 'interest' ? 'success' : 'secondary'} shape="icon" onClick={() => handleReactionClick('interest')}>
              <img
                src={insightful}
                width="16"
                alt="reaction"
              />
            </Button>
            <Button variant="softBg" color={reaction === 'entertainment' ? 'success' : 'secondary'} shape="icon" onClick={() => handleReactionClick('entertainment')}>
              <img
                src={funny}
                width="32"
                alt="reaction"
              />
            </Button>
          </CardContent>
        </Card>
        {comment.status === 'draft' && (
          <div className="flex max-md:flex-col flex-row justify-start gap-2 mt-4">
            <Button color="success" disabled={isPending} onClick={handleApprove}>
              <CheckCircle size={24} className="mr-1.5"/>
              Approve
            </Button>
            <Button color="error" disabled={isPending} onClick={handleReject}>
              Reject
              <XCircle size={24} className="ml-1.5"/>
            </Button>
            <Button color="secondary" disabled={isPending} onClick={handleRemake}>
              Remake
              <ArrowsClockwise size={24} className="ml-1.5"/>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
})