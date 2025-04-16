import { observer } from "mobx-react"
import { Card, Label, Text, Button } from '@gravity-ui/uikit'
import { Comment } from "./Comment"
import { User } from "./User"
import { PostContent } from "./PostContent"
import { Images } from "./Images"
import { IPost, IComment } from "../../types/Post.type"

interface PropsPost {
    post: IPost
    comment: IComment
    isReactionOnPost?: boolean
}
  
export const Post = observer((props: PropsPost) => {
    const {post, comment} = props
    const {author, content} = post
    const hasSharedContent = !!post.shared_content

    const handleOpenPost = () => {
        window.open(post.link_url, '_blank')
    }

    return (
        <Card className="p-4 max-w-[650px] space-y-2" view="filled" type="container">
            {hasSharedContent && (
                <div className="flex justify-start mb-4">
                    <Label theme="success" size="m">
                        ❤️ ↪️ This post is reaction on other post
                    </Label>
                </div>
            )}
            <div className="flex justify-between items-start">
                <User name={author.name} subtitle={author.position} avatarSrc={author.avatar_url} linkUrl={author.link_url} />
                <Button view="flat" onClick={handleOpenPost} title="Open post in new tab">
                    🔗
                </Button>
            </div>
            <PostContent className="text-start" content={content} />
            {hasSharedContent && (
                <div>
                    <div className="flex justify-start mb-1">
                        <Text>
                            ⬇️ ⬇️ ⬇️
                        </Text>
                    </div>
                    <Card className="p-2 text-start" view="filled" type="container">
                        <Text>{post.shared_content.content}</Text>
                    </Card>
                </div>
            )}
            <Images images={post.image_urls} />
            <Comment postId={post.id} comment={comment} />
        </Card>
    )
}) 