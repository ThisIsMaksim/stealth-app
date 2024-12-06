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
import {PhotoProvider, PhotoView} from "react-photo-view"

import 'react-photo-view/dist/react-photo-view.css'
import {observer} from "mobx-react"

interface Props {
  post: IPostWithComment
}

const ImagesWrapper = ({ imagesUrl }: { imagesUrl: string[] }) => {
  if (imagesUrl.length === 1) {
    return (
      <PhotoView src={imagesUrl[0]}>
        <img src={imagesUrl[0]} alt="" />
      </PhotoView>
    )
  }
  if (imagesUrl.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-2">
        <PhotoView src={imagesUrl[0]}>
          <img src={imagesUrl[0]} alt=""/>
        </PhotoView>
        <PhotoView src={imagesUrl[1]}>
          <img src={imagesUrl[1]} alt=""/>
        </PhotoView>
      </div>
    )
  }
  if (imagesUrl.length === 3) {
    const urls = imagesUrl.slice(1, 3)

    return (
      <div className="flex flex-row gap-2">
        <PhotoView src={imagesUrl[0]}>
          <img src={imagesUrl[0]} className="max-w-[300px]" alt=""/>
        </PhotoView>
        <div className="flex flex-col gap-2">
          {urls.map((url, index) => (
            <PhotoView key={index} src={imagesUrl[1]}>
              <img src={url} className="max-w-[200px]" alt="" />
            </PhotoView>
          ))}
        </div>
      </div>
    )
  }

  const urls = imagesUrl.slice(1, 4)

  return (
    <div className="flex flex-row gap-2">
      <PhotoView src={imagesUrl[0]}>
        <img src={imagesUrl[0]} className="max-w-[350px]" alt=""/>
      </PhotoView>
      <div className="flex flex-col gap-2">
        {urls.map((url, index) => (
          <PhotoView key={index} src={imagesUrl[1]}>
            <img src={url} className="max-w-[150px]" alt="" />
          </PhotoView>
        ))}
      </div>
    </div>
  )
}


export const Post = observer(({post}: Props) => {
  const {PostsStore, UserStore} = useStores()
  const [comment, setComment] = useState<string>(post.comment.content)
  const commentMaxLength = useRef(500)
  const [pendingApprove, setPendingApprove] = useState(false)
  const [pendingReject, setPendingReject] = useState(false)
  const [pendingRemake, setPendingRemake] = useState(false)

  const isPending = useMemo(() => pendingApprove || pendingReject || pendingRemake, [pendingApprove, pendingReject, pendingRemake])

  const handleApprove = useCallback(() => {
    setPendingApprove(true)

    PostsStore.approvePost(
      post.post.id,
      post.comment.id,
      comment,
      (error) => {
        if (error) {
          toast.error('Something went wrong')
        } else {
          toast.success('Approved')
        }

        setPendingApprove(false)
      }
    )
  }, [UserStore.user.linkedin_account.linkedin_url, PostsStore, post.post.id, post.comment.id, comment])

  const handleReject = useCallback(() => {
    setPendingReject(true)

    PostsStore.rejectPost(
      post.post.id,
      post.comment.id,
      (error) => {
        if (error) {
          toast.error('Something went wrong')
        } else {
          toast.success('Rejected')
        }

        setPendingReject(false)
      }
    )
  }, [PostsStore, UserStore.user.linkedin_account.linkedin_url, post.comment.id, post.post.id])

  const handleRemake = useCallback(() => {
    setPendingRemake(true)

    PostsStore.remakePost(
      post.post.id,
      post.comment.id,
      (error, response) => {
        if (error) {
          toast.error('Something went wrong')
        }

        setComment(response.content)

        setPendingRemake(false)
      }
    )
  }, [PostsStore, UserStore.user.linkedin_account.linkedin_url, post.comment.id, post.post.id])

  return (
    <Card className="min-w-[400px] max-w-[550px] dark:border-gray-700 mb-4">
      <CardContent className="space-y-3">
        <div className="flex flex-row gap-2">
          <Avatar>
            <AvatarImage src={post.post.author.avatar_url}/>
            <AvatarFallback>{post.post.author.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-start text-gray-900 dark:text-gray-50">{post.post.author.name}</p>
            <p className="text-start text-gray-500 dark:text-gray-200 text-body-4">{post.post.author.position}</p>
          </div>
        </div>
        <Divider/>
        <CardDescription className="text-start" dangerouslySetInnerHTML={{__html: post.post.content}}/>
        <PhotoProvider maskOpacity={0.5} bannerVisible={false}>
          <ImagesWrapper imagesUrl={post.post.image_urls}/>
        </PhotoProvider>
        {post.comment.status === 'draft' && <Divider/>}
        <fieldset className="flex flex-col items-start space-y-3">
          <Label className="text-heading-6" htmlFor="message">
            {post.comment.status === 'draft' ? 'Suggested comment' : 'Your comment'}
          </Label>
          <Textarea
            id="message"
            className="bg-gray-50"
            value={comment}
            placeholder="Write your information about You"
            rows={8}
            maxLength={commentMaxLength.current}
            disabled={post.comment.status !== 'draft'}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="w-full flex justify-end">
            <p className="text-body-4 font-normal text-metal-300">
              {`${comment.length}/${commentMaxLength.current}`}
            </p>
          </div>
        </fieldset>
        {post.comment.status === 'draft' && <div className="flex flex-row justify-start gap-2">
            <Button color="success" disabled={isPending} onClick={handleApprove}>
              {!pendingApprove
                ? <CheckCircle size={24} className="mr-1.5"/>
                : <div style={{marginLeft: '-4px', transform: 'scale(0.6)'}}>
                  <Spinner color="secondary"/>
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
            <Button color="warning" disabled={isPending} onClick={handleRemake}>
                Refresh
              {!pendingRemake
                ? <ArrowsClockwise size={24} className="ml-1.5"/>
                : <div style={{marginLeft: '-4px', transform: 'scale(0.6)'}}>
                  <Spinner color="secondary"/>
                </div>
              }
            </Button>
        </div>}
      </CardContent>
    </Card>
  )
})