import {AuthPageWrapper} from "../AuthPageWrapper"
import {observer} from "mobx-react"
import {useEffect} from "react";
import {useStores} from "../../stores"
import {
  Badge,
  Button,
  Card,
  CardContent,
  Divider,
  Empty,
  EmptyDescription,
  EmptyImage,
  EmptyTitle,
  Skeleton,
  SkeletonLine
} from "keep-react"
import {Funnel} from "phosphor-react"
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
    <EmptyTitle className="mb-[14px] mt-5">You don't have any prospects yet</EmptyTitle>
    <EmptyDescription className="mb-8">
      Add the prospects to your campaign to start using them
    </EmptyDescription>
  </Empty>
)

export const Comments = observer(() => {
  const { CampaignsStore, PostsStore } = useStores()

  useEffect(() => {
    if (CampaignsStore.activeCampaign) {
      PostsStore.fetchPosts(CampaignsStore.activeCampaign.id, '')
    }
  }, [CampaignsStore.activeCampaign?.id])

  let Component = <PostSkeleton />

  if (PostsStore.state === 'pending') {
    Component = <PostSkeleton />
  } else if (!PostsStore.postsWithComments.length) {
    Component = <EmptyComponent />
  } else {
    Component = (
      <>
        {PostsStore.postsWithComments.map((post) => (
          <Post post={post} />
        ))}
      </>
    )
  }

  return <AuthPageWrapper>
    <div className="w-full">
      <div className="flex items-center justify-between pt-4 pb-4">
        <div className="flex items-center gap-5">
          <h2 className="text-heading-6 font-semibold text-metal-900 dark:text-white">Total posts</h2>
          <Badge className="dark:bg-metal-800 dark:text-white">
            {PostsStore.postsWithComments.length}
          </Badge>
        </div>
        <div className="flex items-center gap-5">
          <Button variant="outline" className="flex gap-1.5">
            <Funnel className="size-4 fill-metal-900 dark:fill-white"/>
            Filter posts
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {Component}
      </div>
    </div>
  </AuthPageWrapper>
})
