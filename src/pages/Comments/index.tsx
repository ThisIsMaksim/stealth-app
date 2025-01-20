import {AuthPageWrapper} from "../AuthPageWrapper"
import {observer} from "mobx-react"
import {useEffect, useMemo, useState} from "react"
import {useStores} from "../../stores"
import {
  Card,
  CardContent,
  Divider,
  Empty,
  EmptyImage,
  EmptyTitle, Input, Label, Select, SelectAction, SelectContent, SelectGroup, SelectItem, SelectValue,
  Skeleton,
  SkeletonLine
} from "keep-react"
import {PostWithComment} from "./Post"
import {Stack, User} from "phosphor-react"

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

const EmptyComponent = () => (
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
    <EmptyTitle className="mb-[14px] mt-5">You don't have new posts in this status</EmptyTitle>
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
  useEffect(() => {
    if (CampaignsStore.activeCampaign) {
      PostsStore.fetchPosts(CampaignsStore.activeCampaign.id, status)
    }
  }, [CampaignsStore.activeCampaign, PostsStore, status])

  if (PostsStore.state === 'pending') {
    return <PostSkeleton />
  } else if (!posts.length) {
    return <EmptyComponent />
  } else {
    return posts.map((post) => <PostWithComment post={post} />)
  }
})

export const Comments = observer(() => {
  const { PostsStore } = useStores()
  const [filterByName, setFilterByName] = useState('all')
  const [enteredName, setEnteredName] = useState('')
  const [filterByStatus, setFilterByStatus] = useState('draft')
  const posts = PostsStore.postsWithComments
  const names = useMemo(() => {
    return [...new Set(posts.filter(c => !!c.post.author.name).map(c => c.post.author.name))]
  }, [posts])

  const filters = (
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
                <Stack className="h-4 w-4" />
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
  )

  return (
    <AuthPageWrapper>
      <div className="relative flex flex-col-reverse lg:flex-row w-full gap-4">
        <div className="w-full lg:max-w-[550px]">
          <Posts status={filterByStatus} authorName={filterByName} />
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
