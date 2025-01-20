import {
  Button, Checkbox, Label,
  Modal,
  ModalContent, ModalFooter,
  Textarea, toast,
} from 'keep-react'
import {useCallback, useState} from "react"
import {Action, fetchWithDelay} from "../utils/fetchWithDelay.ts"
import {IRemakePostRequest} from "../stores/posts.store.ts"
import {useStores} from "../stores"
import {IComment} from "../types/Post.type.ts"

interface Props {
  isOpen: boolean
  postId: string
  comment: IComment
  close: () => void
}

const improves = [
  {
    id: 'make_shorter',
    label: 'Make shorter',
  },
  {
    id: 'make_longer',
    label: 'Make longer',
  },
  {
    id: 'disagree_with_post',
    label: 'Disagree with post',
  },
  {
    id: 'ask_a_follow_up_question',
    label: 'Ask a follow-up question',
  },
  {
    id: 'express_opinion',
    label: 'Express opinion',
  },
  {
    id: 'provide_context_about_myself',
    label: 'Provide context about myself',
  },
  {
    id: 'mention_my_company_in_a_comment',
    label: 'Mention my company in a comment',
  },
  {
    id: 'make_a_joke',
    label: 'Make a joke',
  },
  {
    id: 'add_an_emoji',
    label: 'Add an emoji',
  },
]

export const RemakeCommentModal = ({isOpen, postId, comment, close}: Props) => {
  const [value, setValue] = useState(comment.content)
  const [activeImproves, setActiveImproves] = useState({})
  const {PostsStore} = useStores()
  const [isPending, setPending] = useState(false)

  const handleRemake = useCallback(() => {
    setPending(true)

    // eslint-disable-next-line no-async-promise-executor
    const promise = () => new Promise<void>(async (resolve, reject) => {
      const {error} = await fetchWithDelay<IRemakePostRequest, Action<string>>(
        PostsStore.remakePost.bind(PostsStore),
        {
          postId: postId,
          commentId: comment.id,
          comment: value,
          improves: Object.keys(activeImproves)
        }
      )

      setPending(false)

      if (error) {
        reject()
      } else {
        resolve()

        close()
      }
    })

    toast.promise(promise, {
      loading: 'Remaking...',
      success: 'Remade',
      error: 'Something went wrong',
    })
  }, [PostsStore, postId, comment, value, activeImproves])

  return (
    <Modal
      open={isOpen}
      onOpenChange={(value) => !value ? close() : null}
    >
      <ModalContent className="max-md:min-w-[calc(100%-16px)] min-w-[500px]">
        <fieldset className="space-y-3">
          <Label htmlFor="comment">What would you like to change?</Label>
          <Textarea
            id="comment"
            className="h-[200px]"
            value={value}
            placeholder="Text of the comment here"
            onChange={(e) => setValue(e.target.value)}
          />
        </fieldset>
        <div className="flex flex-row gap-2 flex-wrap mt-4">
          {improves.map((action, index) => (
            <fieldset key={index} className="flex items-center gap-2">
              <Checkbox
                id={action.id}
                defaultChecked={activeImproves[action.id]}
                variant="rounded"
                onCheckedChange={(checked) => setActiveImproves({...activeImproves, [action.label]: checked})}
              />
              <Label htmlFor="shorter">{action.label}</Label>
            </fieldset>
          ))}
        </div>
        <ModalFooter className="mt-8">
          <Button color="success" disabled={isPending} onClick={handleRemake}>
            Remake
          </Button>
          <Button color="error" disabled={isPending} onClick={close}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}