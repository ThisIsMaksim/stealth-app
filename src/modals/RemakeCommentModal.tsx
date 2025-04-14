import {useCallback, useState} from "react"
import {Action, fetchWithDelay} from "../utils/fetchWithDelay.ts"
import {IRemakePostRequest} from "../stores/posts.store.ts"
import {useStores} from "../stores"
import {IComment} from "../types/Post.type.ts"
import {Chat} from "phosphor-react"
import { Modal as GravityModal, TextArea, Tab, Button, Text, Checkbox, TabList, TabPanel, TabProvider } from '@gravity-ui/uikit'

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
  const [activeTab, setActiveTab] = useState('item-0')
  // const showOnbording = useOnbording()

  const handleRemake = useCallback(async () => {
    setPending(true)

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

    if (!error) {
      close()
    }
  }, [PostsStore, postId, comment, value, activeImproves])

  // useEffect(() => {
  //   setTimeout(() => {
  //     showOnbording('remake-comment', [
  //       {
  //         selector: '#remake-comment',
  //         content: () => (
  //           <div>
  //             <div className="text-start text-body-3 text-gray-900">
  //               <ul>
  //                 <li>
  //                   In situations when you want to go deeper and tweak a comment in a way you like, or produce a longer
  //                   comment with specific ideas in mind, you can use the Tweak a comment button and provide instructions
  //                   to the AI on what you would like to change
  //                 </li>
  //                 <li>
  //                   You can use quick buttons for common changes.
  //                 </li>
  //                 <li>
  //                   By default, it will take into account the previous iteration and apply changes on top of it. This is
  //                   useful if you mostly like the iteration, but would like to change something (Add a question, Change
  //                   tone of voice, Add a specific idea)
  //                 </li>
  //                 <li>
  //                   You can also Start from scratch, and provide specific instructions when you want your comment to be
  //                   drafted in a certain way, and you don't want it to be based on the previous iteration.
  //                 </li>
  //               </ul>
  //             </div>
  //           </div>
  //         ),
  //       },
  //     ])
  //   }, 1000)
  // }, [showOnbording])

  return (
    <GravityModal
      open={isOpen}
      onClose={close}
    >
      <div className="w-[550px] p-6">
        <Text variant="header-2">Remake Comment</Text>
        <TabProvider value={activeTab} onUpdate={setActiveTab}>
          <TabList className="mt-2" value={activeTab} size="m">
            <Tab value="item-0">
              Start from scratch
            </Tab>
            <Tab value="item-1">
              Improve current
            </Tab>
          </TabList>
          <div className="mt-4">
              <TabPanel value="item-0">
                <div className="w-full h-full space-y-3">
                  <label htmlFor="comment">How the new comment should look like?</label>
                  <TextArea
                    id="comment"
                    size="l"
                    rows={4}
                    value={changes}
                    placeholder="Text of the comment here"
                    onChange={(e) => setChanges(e.target.value)}
                  />
                </div>
              </TabPanel>
              <TabPanel value="item-1">
                <div className="space-y-3">
                  <div className="flex flex-row gap-2 w-full">
                    <Chat size={32} />
                    <TextArea
                      id="comment"
                      size="l"
                      rows={6}
                      value={value}
                      placeholder="Add instructions use buttons bellow..."
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="changes">What would you like to change?</label>
                    <TextArea
                      id="changes"
                      size="l"
                      rows={4}
                      value={changes}
                      placeholder="Add instructions use buttons bellow..."
                      onChange={(e) => setChanges(e.target.value)}
                    />
                  </div>
                </div>
              </TabPanel>
          </div>
      </TabProvider>
        
        <div className="flex flex-row gap-2 flex-wrap mt-4">
          {improves.map((action, index) => (
            <div key={index} className="flex items-center gap-2">
              <Checkbox
                checked={activeImproves[action.id]}
                onChange={(checked) => setActiveImproves({...activeImproves, [action.label]: checked})}
              >
                {action.label}
              </Checkbox>
            </div>
          ))}
        </div>
        <div className="flex flex-row gap-2 mt-4">
          <Button 
            view="action"
            loading={isPending}
            onClick={handleRemake}
          >
            Regenerate
          </Button>
          <Button 
            view="flat"
            disabled={isPending} 
            onClick={close}
          >
            Cancel
          </Button>
        </div>
      </div>
    </GravityModal>
  )
}