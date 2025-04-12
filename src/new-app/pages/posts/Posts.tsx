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
import { EmptyComponent } from "../../components/EmptyComponent"
import { PostsOnboarding } from "../../components/PostsOnboarding"
import { PageWrapper } from "../../components/PageWrapper"

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
        content = <EmptyComponent title={chooseStatus !== 'draft' ? "You don't have posts in this status" : "You don't have new posts"} />
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
