import {
  Button, Checkbox, Label,
  Modal,
  ModalContent, ModalFooter, Tabs, TabsContent, TabsItem, TabsList,
  Textarea, toast,
} from 'keep-react'
import {useCallback, useEffect, useState} from "react"
import {Action, fetchWithDelay} from "../utils/fetchWithDelay.ts"
import {IRemakePostRequest} from "../stores/posts.store.ts"
import {useStores} from "../stores"
import {IComment} from "../types/Post.type.ts"
import {Chat} from "phosphor-react"
import {useOnbording} from "../hooks/useOnbording.ts";

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
  const [changes, setChanges] = useState('')
  const [activeImproves, setActiveImproves] = useState({})
  const {PostsStore} = useStores()
  const [isPending, setPending] = useState(false)
  const showOnbording = useOnbording()

  const handleRemake = useCallback(() => {
    setPending(true)

    // eslint-disable-next-line no-async-promise-executor
    const promise = () => new Promise<void>(async (resolve, reject) => {
      const improves = Object.keys(activeImproves)

      if (changes.length > 0) {
        improves.push(changes)
      }

      const {error} = await fetchWithDelay<IRemakePostRequest, Action<string>>(
        PostsStore.remakePost.bind(PostsStore),
        {
          postId: postId,
          commentId: comment.id,
          comment: value,
          improves
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

  useEffect(() => {
    setTimeout(() => {
      showOnbording('remake-comment', [
        {
          selector: '#remake-comment',
          content: () => (
            <div>
              <div className="text-start text-body-3 text-gray-900">
                <ul>
                  <li>
                    In situations when you want to go deeper and tweak a comment in a way you like, or produce a longer
                    comment with specific ideas in mind, you can use the Tweak a comment button and provide instructions
                    to the AI on what you would like to change
                  </li>
                  <li>
                    You can use quick buttons for common changes.
                  </li>
                  <li>
                    By default, it will take into account the previous iteration and apply changes on top of it. This is
                    useful if you mostly like the iteration, but would like to change something (Add a question, Change
                    tone of voice, Add a specific idea)
                  </li>
                  <li>
                    You can also Start from scratch, and provide specific instructions when you want your comment to be
                    drafted in a certain way, and you don't want it to be based on the previous iteration.
                  </li>
                </ul>
              </div>
            </div>
          ),
        },
      ])
    }, 1000)
  }, [showOnbording])

  return (
    <Modal
      open={isOpen}
      onOpenChange={(value) => !value ? close() : null}
    >
      <ModalContent className="max-md:min-w-[calc(100%-16px)] min-w-[500px]">
        <Tabs defaultValue="item-1" className="mx-auto max-w-xl space-y-3">
          <TabsList className="flex flex-row justify-start gap-2">
            <TabsItem value="item-1">
              Start from scratch
            </TabsItem>
            <TabsItem value="item-2">
              Improve current
            </TabsItem>
          </TabsList>
          <TabsContent value="item-1">
            <fieldset className="space-y-3">
              <Label htmlFor="comment">How the new comment should look like?</Label>
              <Textarea
                id="comment"
                className="h-[100px]"
                value={changes}
                placeholder="Text of the comment here"
                onChange={(e) => setChanges(e.target.value)}
              />
            </fieldset>
          </TabsContent>
          <TabsContent value="item-2" className="space-y-3">
            <div className="flex flex-row gap-2 w-full">
              <Chat size={32} />
              <fieldset className="space-y-2 w-full">
                <Textarea
                  id="comment"
                  className="h-[140px]"
                  value={value}
                  placeholder="Add instructions use buttons bellow..."
                  onChange={(e) => setValue(e.target.value)}
                />
              </fieldset>
            </div>
            <fieldset className="space-y-2">
              <Label htmlFor="comment">What would you like to change?</Label>
              <Textarea
                id="comment"
                className="h-[100px]"
                value={changes}
                placeholder="Add instructions use buttons bellow..."
                onChange={(e) => setChanges(e.target.value)}
              />
            </fieldset>
          </TabsContent>
        </Tabs>
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