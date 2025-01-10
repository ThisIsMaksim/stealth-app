import { flow, makeAutoObservable } from "mobx"
import {getHost} from "../utils/getHost.ts"
import {IComment, IPostWithComment} from "../types/Post.type.ts";

export interface IApprovePostRequest {
  postId: string
  commentId: string
  comment: string
}

export interface IRejectPostRequest {
  postId: string
  commentId: string
}

export interface IRemakePostRequest {
  postId: string
  commentId: string
}

class PostsStore {
  state = "pending"
  postsWithComments: IPostWithComment[] = []

  constructor() {
    makeAutoObservable(this, {
      fetchPosts: flow,
    })
  }

  *fetchPosts(id: string, status: string) {
    this.state = "pending"
    this.postsWithComments = []

    const limit = 50
    const offset = 0

    const response = yield fetch(`${getHost()}/api/v1/posts/?limit=${limit}&offset=${offset}&campaign_id=${id}&status=${status}`)

    if (!response.ok) {
      this.state = "error"

      return
    }

    const data = yield response.json()

    this.postsWithComments = data.posts_with_comments
    this.state = "done"
  }

  *approvePost(request: IApprovePostRequest, action: (error?: string, response?: string) => void) {
    const response = yield fetch(
      `${getHost()}/api/v1/posts/${request.postId}/comments/${request.commentId}/approve`,
      {
        method: 'Post',
        body: JSON.stringify({
          content: request.comment
        }),
      }
    )

    if (!response.ok) {
      action('error', null)

      return
    }

    const data = yield response.json()

    action(null, data.body)
  }

  *rejectPost(request: IRejectPostRequest, action: (error?: string, response?: string) => void) {
    const response = yield fetch(`${getHost()}/api/v1/posts/${request.postId}/comments/${request.commentId}/reject`, {method: 'Post'})

    if (!response.ok) {
      action('error', null)

      return
    }

    const data = yield response.json()

    action(null, data.body)
  }

  *remakePost(request: IRemakePostRequest, action: (error?: string, response?: IComment) => void) {
    const response = yield fetch(`${getHost()}/api/v1/posts/${request.postId}/comments/${request.commentId}/remake`, {method: 'Post'})

    if (!response.ok) {
      action('error', null)

      return
    }

    const data = yield response.json()

    action(null, data.comment)
  }

  *changePostStatus(postId: string, status: string) {
    this.postsWithComments = this.postsWithComments.map(item => {
      if (item.post.id === postId) {
        item.comment.status = status
      }

      return item
    })
  }
}

export default PostsStore