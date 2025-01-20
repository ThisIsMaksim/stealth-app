import {Badge, Card, CardContent, CardDescription} from "keep-react"
import {IPost} from "../../../types/Post.type.ts"
import {SharedPost} from "./index.tsx"
import {Summary} from "./Summary.tsx"

interface Props {
  post: IPost
}

export const Content = ({ post }: Props) => {
  return (
    <>
      <CardDescription className="text-start" dangerouslySetInnerHTML={{__html: post.content}} />
      {post.summary && <Summary summary={post.summary} />}
      {post.shared_content && (
        <>
          <div className="flex justify-start">
            <Badge variant="background" color="secondary">Reaction on post</Badge>
          </div>
          <Card className="relative w-full max-w-[550px] dark:border-gray-700">
            <CardContent className="relative space-y-3 max-md:p-4">
              <SharedPost post={post.shared_content}/>
            </CardContent>
          </Card>
        </>
      )}
    </>
  )
}