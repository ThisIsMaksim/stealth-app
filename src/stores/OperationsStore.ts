import { flow, makeAutoObservable } from 'mobx'
import { IComment, IPost, IPostWithComment } from '../types/Post.type'
import { getHost } from '../utils/getHost'
import { notificationStore } from './NotificationStore'

export interface Operation {
  id: string
  post: IPost
  comment: IComment
}

export class OperationsStore {
  operations: Operation[] = []
  previousOperations: Operation[] = []

  constructor() {
    makeAutoObservable(this, {
      fetchOperations: flow,
    })
  }

  *fetchOperations(id: string) {
    // Сохраняем текущие операции как предыдущие
    this.previousOperations = JSON.parse(localStorage.getItem('operations') || '[]')

    const response = yield fetch(`${getHost()}/api/v1/posts/?limit=${300}&offset=${0}&campaign_id=${id}&status=pending`)

    const data = yield response.json()
    const items: IPostWithComment[] = data.posts_with_comments
    const newOperations = items.filter(post => post.comment.status === 'pending')
      .map((post) => ({
        id: post.post.id,
        post: post.post,
        comment: post.comment
      }))

    localStorage.setItem('operations', JSON.stringify(newOperations.map(({id}) => id)))

    // Находим исчезнувшие операции
    const disappearedOperations = this.previousOperations.filter(
      prevOp => !newOperations.find(newOp => newOp.id === prevOp.id)
    )

    // Добавляем уведомления для исчезнувших операций
    console.log('Disappeared operations:', disappearedOperations)
    disappearedOperations.forEach(operation => {
      console.log('Adding notification for operation:', operation.id)
      notificationStore.addNotification({
        id: `published_${operation.id}`,
        text: `Comment on post "${operation.post.link_url}" has been published`,
        read: false
      })
    })

    this.operations = newOperations
  }
} 