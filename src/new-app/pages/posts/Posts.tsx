import { observer } from "mobx-react"
import { IPostWithComment } from "../../../types/Post.type"
import { useEffect, useState } from "react"
import { useStores } from "../../../stores"
import { Post } from "../../components/Post"
import { Menu } from "../../components/Menu"
import { Profile } from "../../components/Profile"
import { SelectCampaign } from "../../components/SelectCampaign"
import { AddProspects } from "../../components/AddProspects"
import { LoadMorePosts } from "../../components/LoadMorePosts"
import { PostsSkeleton } from "../../components/PostsSkeleton"
import { WelcomeEmptyState } from "../../components/WelcomeEmptyState"
import { PostsOnboarding } from "../../components/PostsOnboarding"
import { PageWrapper } from "../../components/PageWrapper"
import Lottie from 'react-lottie'
import emptyLottie from "../../../assets/lottie/empty.json"
import {Text, Card} from "@gravity-ui/uikit"

const defaultOptions = {
    loop: false,
    autoplay: true, 
    animationData: emptyLottie,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
}

const EmptyComponent = () => (
    <Card className="flex flex-col items-center justify-center w-[100vw] max-w-[650px] h-[500px] p-8" view="filled" type="container" theme="normal">
        <div>
            <Lottie
                    options={defaultOptions}
                    height={400}
                    width={400}
                />
            <div className="flex flex-col mt-4">
                <Text variant="header-1" className="mb-[14px]">You don't have new posts</Text>
            </div>
        </div>
    </Card>
)

interface PostsProps {
    posts: IPostWithComment[]
}

const Posts = observer(({posts}: PostsProps) => {
    return (
        <div className="flex flex-col space-y-4">
            {posts.map((post, index) => (
                <Post
                    key={index}
                    post={post.post}
                    comment={post.comment}
                />
            ))}
        </div>
    )
})

export const PostsPage = observer(() => {
    const { CampaignsStore, PostsStore, ProspectsStore } = useStores()
    const items = PostsStore.postsWithComments
    const [chooseStatus] = useState('draft')
    const [enteredAuthorName] = useState('all')
    const posts = items
        .filter(post => post.comment.status === chooseStatus && (enteredAuthorName === 'all' || post.post.author.name === enteredAuthorName))
    let content = null

    useEffect(() => {
        if (CampaignsStore.activeCampaign) {
            PostsStore.fetchPosts(CampaignsStore.activeCampaign.id, chooseStatus, 0)
            ProspectsStore.fetchProspects(CampaignsStore.activeCampaign.id)
        }
    }, [CampaignsStore.activeCampaign, PostsStore, chooseStatus])

    if (PostsStore.state === 'pending' || ProspectsStore.state === 'pending') {
        content = <PostsSkeleton />
    } else if (ProspectsStore.prospects.length === 0) {
        content = <WelcomeEmptyState />
    } else if (!posts.length) {
        content = <EmptyComponent />
    } else {
        content = (
            <>
                <Posts posts={posts} />
                <LoadMorePosts chooseStatus={chooseStatus} />
            </>
        )
    }

    return (
        <>
            <PageWrapper
                leftBlock={
                    <>
                        <Profile />
                        <Menu />
                    </>
                }
                centerBlock={content}
                rightBlock={
                    <>
                        <SelectCampaign />
                        <AddProspects />
                    </>
                }
            />
            <PostsOnboarding />
        </>
    )
})
