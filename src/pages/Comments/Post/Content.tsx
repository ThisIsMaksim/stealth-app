import {Card, CardContent, CardDescription} from "keep-react"
import {IPost} from "../../../types/Post.type.ts"
import {SharedPost} from "./index.tsx"
import {Summary} from "./Summary.tsx"

interface Props {
  post: IPost
}

export const Content = ({ post }: Props) => {
  return (
    <>
      {post.summary && <Summary summary={post.summary} />}
      <CardDescription className="text-start" dangerouslySetInnerHTML={{__html: post.content}} />
      {post.shared_content && (
        <Card className="relative w-full max-w-[550px] dark:border-gray-700">
          <CardContent className="relative space-y-3 max-md:p-4">
            <SharedPost post={post.shared_content}/>
          </CardContent>
        </Card>
      )}
    </>
  )
}