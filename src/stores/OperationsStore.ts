import { flow, makeAutoObservable } from 'mobx'
import { IComment, IPost, IPostWithComment } from '../types/Post.type'
import { getHost } from '../utils/getHost'

export interface Operation {
  id: string
  post: IPost
  comment: IComment
}

export class OperationsStore {
  operations: Operation[] = []

  constructor() {
    makeAutoObservable(this, {
      fetchOperations: flow,
    })
  }

  *fetchOperations(id: string) {
    const response = yield fetch(`${getHost()}/api/v1/posts/?limit=${300}&offset=${0}&campaign_id=${id}&status=pending`)

    const data = yield response.json()
    const items: IPostWithComment[] = data.posts_with_comments

    this.operations = items.filter(post => post.comment.status === 'pending')
      .map((post) => ({
        id: post.post.id,
        post: post.post,
        comment: post.comment
      }))
  }
} 