import {
  Button,
  Card,
  CardContent,
  Divider,
} from "keep-react"
import {IPost, IPostWithComment} from "../../../types/Post.type.ts"

import 'react-photo-view/dist/react-photo-view.css'
import {observer} from "mobx-react"
import {Author} from "./Author.tsx"
import {Images} from "./Images.tsx"
import {Comment} from "./Comment.tsx"
import {Content} from "./Content.tsx"
import {ArrowSquareOut} from "phosphor-react"
import {useCallback, useRef, useState} from "react";

interface PropsPostWithComment {
  index: number
  post: IPostWithComment
}

interface PropsPost {
  post: IPost
  isReactionOnPost?: boolean
}

export const Post = observer(({ post }: PropsPost) => {
  const hasSharedContent = !!post.shared_content

  return (
    <>
      <Author author={post.author} />
      <Divider />
      <Content post={post} />
      {!hasSharedContent && <Images images={post.image_urls}/>}
    </>
  )
})

export const SharedPost = observer(({ post }: PropsPost) => {
  const [showOpenPostButton, setShowOpenPostButton] = useState(false)
  const timeoutRef = useRef(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()

    clearTimeout(timeoutRef.current)

    setShowOpenPostButton(true)

    timeoutRef.current = setTimeout(() => setShowOpenPostButton(false), 2000)
  }, [])

  return (
    <div onMouseMove={handleMouseMove}>
      {showOpenPostButton && <OpenPost linkUrl={post.link_url} isShared={!!post.shared_content} />}
      <Content post={post} />
      <Images images={post.image_urls} />
    </div>
  )
})

export const PostWithComment = observer(({ index, post }: PropsPostWithComment) => {
  const [showOpenPostButton, setShowOpenPostButton] = useState(false)
  const timeoutRef = useRef(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()

    clearTimeout(timeoutRef.current)

    setShowOpenPostButton(true)

    timeoutRef.current = setTimeout(() => setShowOpenPostButton(false), 2000)
  }, [])

  return (
    <Card className="relative w-full max-w-[550px] p-0 dark:border-gray-700 mb-4">
      <CardContent className="relative p-0 bg-blue-700">
      {post.post.shared_content && <div className="flex items-center w-full h-[40px] text-start text-sm pl-2 text-white">reaction on post</div>}
      <Card className="w-full max-w-[550px] max-md:p-0" onMouseMove={handleMouseMove}>
        {showOpenPostButton && <OpenPost linkUrl={post.post.link_url} isShared={!!post.post.shared_content} />}
        <CardContent className="space-y-3 max-md:p-4 p-3">
          <Post post={post.post} />
          <Comment index={index} postId={post.post.id} comment={post.comment} />
        </CardContent>
      </Card>
      </CardContent>
    </Card>
  )
})

interface OpenPostProps {
  linkUrl: string
  isShared: boolean
}

export const OpenPost = ({ linkUrl, isShared }: OpenPostProps) => (
  <div className={`absolute top-[${!isShared ? '16px' : '56px'}] right-[16px]`}>
    <Button variant="softBg" shape="icon" color="secondary" onClick={() => window.open(linkUrl, '_blank')}>
      <ArrowSquareOut/>
    </Button>
  </div>
)