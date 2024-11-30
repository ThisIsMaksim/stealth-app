import { flow, makeAutoObservable } from "mobx"
import {getHost} from "../utils/getHost.ts"
import {IPostWithComment} from "../types/Post.type.ts";

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

  *approvePost(postId: string, commentId: string, action: (error?: string, response?: string) => void) {
    const response = yield fetch(`${getHost()}/api/v1/posts/${postId}/comments/${commentId}/approve`, {method: 'Post'})

    if (!response.ok) {
      action('error', null)

      return
    }

    const data = yield response.json()

    action(null, data.body)
  }

  *rejectPost(postId: string, commentId: string, action: (error?: string, response?: string) => void) {
    const response = yield fetch(`${getHost()}/api/v1/posts/${postId}/comments/${commentId}/reject`, {method: 'Post'})

    if (!response.ok) {
      action('error', null)

      return
    }

    const data = yield response.json()

    action(null, data.body)
  }

  *remarkPost(postId: string, commentId: string, action: (error?: string, response?: string) => void) {
    const response = yield fetch(`${getHost()}/api/v1/posts/${postId}/comments/${commentId}/remark`, {method: 'Post'})

    if (!response.ok) {
      action('error', null)

      return
    }

    const data = yield response.json()

    action(null, data.body)
  }
}

export default PostsStore