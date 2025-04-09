import {AuthPageWrapper} from "../AuthPageWrapper"
import {observer} from "mobx-react"
import {useCallback, useEffect, useMemo, useRef, useState} from "react"
import {useStores} from "../../stores"
import {
  Card,
  CardContent,
  Divider,
  Empty,
  EmptyImage,
  EmptyTitle, Input, Label, Select, SelectAction, SelectContent, SelectGroup, SelectItem, SelectValue,
  Skeleton,
  SkeletonLine,
} from "keep-react"
import {PostWithComment} from "./Post"
import {Stack, User} from "phosphor-react"
import {useOnbording} from "../../hooks/useOnbording.ts"
import { SyncLoader } from "react-spinners"

const PostSkeleton = () => (
  <Card className="min-w-[400px] max-w-[550px] dark:border-gray-700">
    <Skeleton>
      <CardContent className="space-y-3">
        <div className="flex flex-row gap-2">
          <SkeletonLine className="h-12 w-12 rounded-full"/>
          <div className="space-y-2">
            <SkeletonLine className="h-4 w-[200px]" />
            <SkeletonLine className="h-4 w-[200px]" />
          </div>
        </div>
        <Divider />
        <SkeletonLine className="h-52 w-full" />
        <Divider />
        <SkeletonLine className="h-40 w-full" />
        <SkeletonLine className="h-10 w-full mt-4" />
      </CardContent>
    </Skeleton>
  </Card>
)

interface EmptyComponentProps {
  title: string
}

const EmptyComponent = ({ title }: EmptyComponentProps) => (
  <Empty>
    <EmptyImage>
      <img
        src="https://staticmania.cdn.prismic.io/staticmania/16994ca5-ac01-4868-8ade-1b9e276ccdb3_Property+1%3DFolder_+Property+2%3DLg.svg"
        className="pt-4"
        height={234}
        width={350}
        alt="404"
      />
    </EmptyImage>
    <EmptyTitle className="mb-[14px] mt-5">{title}</EmptyTitle>
  </Empty>
)

interface Props {
  status: string
  authorName: string
}

const Posts = observer(({status, authorName}: Props) => {
  const { CampaignsStore, PostsStore } = useStores()
  const posts = PostsStore.postsWithComments
    .filter(post => post.comment.status === status && (authorName === 'all' || post.post.author.name === authorName))
  const offset = useRef(0)
  const canLoadMore = useRef(true)

  const handleLoadMorePosts = useCallback(() => {
    offset.current = offset.current + 10

    handleFetchMorePosts()
  }, [offset])
  const handleFetchMorePosts = useCallback(() => {
    PostsStore.fetchPosts(CampaignsStore.activeCampaign.id, status, offset.current)
  }, [CampaignsStore.activeCampaign, PostsStore])

  useEffect(() => {
    if (CampaignsStore.activeCampaign) {
      PostsStore.fetchPosts(CampaignsStore.activeCampaign.id, status, offset.current)
    }
  }, [CampaignsStore.activeCampaign, PostsStore, status])

  useEffect(() => {
    offset.current = 0
  }, [status])

  if (PostsStore.state === 'pending') {
    return <PostSkeleton />
  } else if (!posts.length) {
    return <EmptyComponent title={status !== 'draft' ? "You don't have posts in this status" : "You don't have new posts"} />
  } else {
    return (
      <div>
        {posts.map((post, index) => <PostWithComment index={index} post={post} />)}
        {!PostsStore.ended && (
          <div
          ref={(node) => {
            if (node) {
              const observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                  if (canLoadMore.current === true && PostsStore.state === 'done') {
                    handleLoadMorePosts()

                    canLoadMore.current = false

                    setTimeout(() => canLoadMore.current = true, 1000)
                  }
                }
              })
              observer.observe(node)
            }
          }}
        >
          <SyncLoader color="rgb(27, 77, 255)" size={6} />
          </div>
        )}
      </div>
    )
  }
})

export const Comments = observer(() => {
  const { PostsStore } = useStores()
  const commentsRef = useRef<HTMLDivElement>(null)
  const [filterByName, setFilterByName] = useState('all')
  const [enteredName, setEnteredName] = useState('')
  const [filterByStatus, setFilterByStatus] = useState('draft')
  const posts = PostsStore.postsWithComments
  const names = useMemo(() => {
    return [...new Set(posts.filter(c => !!c.post.author.name).map(c => c.post.author.name))]
  }, [posts])
  const showOnbording = useOnbording()

  useEffect(() => {
    if (posts.length === 0) return

    setTimeout(() => {
      showOnbording('comment', [
        {
          selector: '#comment-0',
          content: () => (
            <div>
              <div className="text-start text-body-3 text-gray-900">
                You can Approve, Reject, or manually correct comments, either all at once or one by one. Approved comments go to Pending, and then are posted automatically.
                <ul>
                  <li>
                    Nothing is posted without your approval.
                  </li>
                  <li>
                    A like is added by default, so approving also likes the post. You can turn this off or change the reaction type.
                  </li>
                </ul>
              </div>
            </div>
          ),
        },
      ])
    }, 1000)
  }, [posts, showOnbording])

  useEffect(() => {
    commentsRef.current?.parentElement?.scrollTo(0, 0)
  }, [filterByName, filterByStatus])

  const filters = (
    <Card className="max-w-full dark:border-gray-700">
      <CardContent>
        <div className="text-start space-y-3">
          <fieldset className="space-y-3">
            <Label htmlFor="filter-by-name">Prospect name</Label>
            <Select
              value={filterByName}
              onValueChange={setFilterByName}
            >
              <SelectAction id="filter-by-name" className="max-w-[550px]">
                <div className="flex items-center gap-2.5">
              <span>
                <User className="h-4 w-4"/>
              </span>
                  <SelectValue
                    placeholder="Prospect name"
                  />
                </div>
              </SelectAction>
              <SelectContent className="w-full border border-metal-100 dark:border-metal-800 dark:bg-gray-900">
                <Input
                  placeholder="Enter name"
                  type="text"
                  autoFocus
                  onChange={(e) => setEnteredName(e.target.value)}
                  onKeyDown={(e) => e.stopPropagation()}
                />
                <SelectGroup className="mt-2">
                  {!enteredName && <SelectItem value="all">All</SelectItem>}
                  {names
                    .filter((name) => name.toLowerCase().startsWith(enteredName.toLowerCase()))
                    .map((name) => (
                      <SelectItem key={name} value={name}>{name}</SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </fieldset>
          <fieldset className="space-y-3">
            <Label htmlFor="filter-by-status">Status</Label>
            <Select
              value={filterByStatus}
              onValueChange={setFilterByStatus}
            >
              <SelectAction id="filter-by-name" className="max-w-[550px]">
                <div className="flex items-center gap-2.5">
              <span>
                <Stack className="h-4 w-4"/>
              </span>
                  <SelectValue
                    placeholder="Prospect status"
                  />
                </div>
              </SelectAction>
              <SelectContent className="w-full border border-metal-100 dark:border-metal-800 dark:bg-gray-900">
                <SelectGroup className="mt-2">
                  <SelectItem value="draft">New</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="posted">Posted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </fieldset>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <AuthPageWrapper>
      <div ref={commentsRef} className="relative flex flex-col-reverse lg:flex-row w-full gap-4">
        <div className="w-full lg:max-w-[550px]">
          <Posts status={filterByStatus} authorName={filterByName}/>
        </div>
        <div className="relative w-full lg:max-w-[350px]">
          <div className="relative lg:sticky lg:top-0">
            {filters}
          </div>
        </div>
      </div>
    </AuthPageWrapper>
  )
})
