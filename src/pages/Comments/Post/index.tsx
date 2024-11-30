import {useCallback, useMemo, useRef, useState} from "react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage, Button,
  Card,
  CardContent,
  CardDescription,
  Divider,
  Label, Spinner,
  Textarea, toast
} from "keep-react"
import {IPostWithComment} from "../../../types/Post.type.ts"
import {ArrowsClockwise, CheckCircle, XCircle} from "phosphor-react"
import {useStores} from "../../../stores";

interface Props {
  post: IPostWithComment
}

export const Post = ({ post }: Props) => {
  const {PostsStore} = useStores()
  const [comment, setComment] = useState<string>(post.comment.content)
  const commentMaxLength = useRef(500)
  const [pendingApprove, setPendingApprove] = useState(false)
  const [pendingReject, setPendingReject] = useState(false)
  const [pendingRemark, setPendingRemark] = useState(false)
  
  const isPending = useMemo(() => pendingApprove || pendingReject || pendingRemark, [pendingApprove, pendingReject, pendingRemark])
  
  const handleApprove = useCallback(() => {
    setPendingApprove(true)

    PostsStore.approvePost(
      post.post.id,
      post.comment.id,
      (error) => {
        if (error) {
          toast.error('Something went wrong')
        }

        setPendingApprove(false)
      }
    )
  }, [PostsStore, post])

  const handleReject = useCallback(() => {
    setPendingReject(true)

    PostsStore.rejectPost(
      post.post.id,
      post.comment.id,
      (error) => {
        if (error) {
          toast.error('Something went wrong')
        }

        setPendingReject(false)
      }
    )
  }, [PostsStore, post])

  const handleRemark = useCallback(() => {
    setPendingRemark(true)

    PostsStore.remarkPost(
      post.post.id,
      post.comment.id,
      (error) => {
        if (error) {
          toast.error('Something went wrong')
        }

        setPendingRemark(false)
      }
    )
  }, [PostsStore, post])

  return (
    <Card className="min-w-[400px] max-w-[550px] dark:border-gray-700">
      <CardContent className="space-y-3">
        <div className="flex flex-row gap-2">
          <Avatar>
            <AvatarImage src={post.post.author.avatar_url}/>
            <AvatarFallback>{post.post.author.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-start text-gray-900 dark:text-gray-50">{post.post.author.name}</p>
            <p className="text-start text-gray-700 dark:text-gray-200">{post.post.author.position}</p>
          </div>
        </div>
        <Divider />
        <CardDescription className="text-start">
          {post.post.content}
        </CardDescription>
        <img
          src="https://react.keepdesign.io/_next/image?url=%2Fimages%2Fkeep-card.jpg&w=1200&q=75"
          className="rounded-xl"
          alt="image"
          width={600}
          height={300}
        />
        <Divider />
        <fieldset className="flex flex-col items-start space-y-3">
          <Label className="text-heading-6" htmlFor="message">Suggested comment</Label>
          <Textarea
            id="message"
            className="bg-gray-50"
            value={comment}
            placeholder="Write your information about You"
            rows={8}
            maxLength={commentMaxLength.current}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="w-full flex justify-end">
            <p className="text-body-4 font-normal text-metal-300">
              {`${comment.length}/${commentMaxLength.current}`}
            </p>
          </div>
        </fieldset>
        <div className="flex flex-row justify-start gap-2">
          <Button color="success" disabled={isPending} onClick={handleApprove}>
            {!pendingApprove
              ? <CheckCircle size={24} className="mr-1.5"/>
              : <div style={{ marginLeft: '-4px', transform: 'scale(0.6)'}}>
                  <Spinner color="secondary" />
                </div>
            }
            Approve
          </Button>
          <Button color="error" disabled={isPending} onClick={handleReject}>
            Reject
            {!pendingReject
              ? <XCircle size={24} className="ml-1.5"/>
              : <div style={{marginLeft: '-4px', transform: 'scale(0.6)'}}>
                  <Spinner color="secondary"/>
                </div>
            }
          </Button>
          <Button color="warning" disabled={isPending} onClick={handleRemark}>
            Refresh
            {!pendingRemark
              ? <ArrowsClockwise size={24} className="ml-1.5"/>
              : <div style={{marginLeft: '-4px', transform: 'scale(0.6)'}}>
                  <Spinner color="secondary"/>
                </div>
            }
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}