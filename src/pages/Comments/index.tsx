import {AuthPageWrapper} from "../AuthPageWrapper"
import {observer} from "mobx-react"
import {useEffect} from "react";
import {useStores} from "../../stores"
import {
  Card,
  CardContent,
  Divider,
  Empty,
  EmptyImage,
  EmptyTitle,
  Skeleton,
  SkeletonLine, Tabs, TabsContent, TabsItem, TabsList
} from "keep-react"
import {Post} from "./Post"

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
}

const Posts = observer(({status}: Props) => {
  const { CampaignsStore, PostsStore } = useStores()
  const posts = PostsStore.postsWithComments
    .filter(post => post.comment.status === status)

  useEffect(() => {
    if (CampaignsStore.activeCampaign) {
      PostsStore.fetchPosts(CampaignsStore.activeCampaign.id, status)
    }
  }, [CampaignsStore.activeCampaign?.id, status])

  if (PostsStore.state === 'pending') {
    return <PostSkeleton />
  } else if (!posts.length) {
    return <EmptyComponent />
  } else {
    return posts.map((post) => <Post post={post} />)
  }
})

export const Comments = observer(() => {
  return <AuthPageWrapper>
    <div className="w-full">
      <Tabs variant="default" defaultValue="item-1" className="space-y-4">
        <>
          <TabsList className="flex justify-start">
            <TabsItem value="item-1">
              New
            </TabsItem>
            <TabsItem value="item-2">
              Pending
            </TabsItem>
            <TabsItem value="item-3">
              Posted
            </TabsItem>
            <TabsItem value="item-4">
              Rejected
            </TabsItem>
          </TabsList>
        </>
        <TabsContent value="item-1">
          <Posts status="draft" />
        </TabsContent>
        <TabsContent value="item-2">
          <Posts status="pending" />
        </TabsContent>
        <TabsContent value="item-3">
          <Posts status="posted" />
        </TabsContent>
        <TabsContent value="item-4">
          <Posts status="rejected" />
        </TabsContent>
      </Tabs>
    </div>
  </AuthPageWrapper>
})
