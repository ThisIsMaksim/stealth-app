import { makeObservable, observable, action, computed } from 'mobx';
import { ReactNode } from 'react';

// Определяем интерфейс для уведомления
// Убедитесь, что он совпадает с тем, что используется в Notifications.tsx
export interface Notification {
  id: string;
  text: string | ReactNode;
  read: boolean;
  // Можно добавить другие поля, например, timestamp, link и т.д.
}


export class NotificationStore {
  notifications: Notification[] = [];

  constructor() {
    makeObservable(this, {
      notifications: observable,
      hasUnread: computed,
      markAsRead: action,
      markAllAsRead: action,
    })
  }

  // Экшен для отметки одного уведомления как прочитанного
  markAsRead(id: string) {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
      console.log(`Notification ${id} marked as read`);
      
      // Получаем текущий список прочитанных уведомлений из localStorage
      const readNotifications = JSON.parse(localStorage.getItem('readNotifications') || '[]')
      
      // Добавляем новое прочитанное уведомление, если его еще нет в списке
      if (!readNotifications.includes(id)) {
        readNotifications.push(id);
        localStorage.setItem('readNotifications', JSON.stringify(readNotifications));
      }
      
      // TODO: Возможно, отправить запрос на API для обновления статуса на бэкенде
    }
  }

  // Экшен для отметки всех уведомлений как прочитанных
  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
    console.log('All notifications marked as read');
    
    // Получаем все ID уведомлений
    const allNotificationIds = this.notifications.map(n => n.id);
    
    // Сохраняем все ID в localStorage как прочитанные
    localStorage.setItem('readNotifications', JSON.stringify(allNotificationIds));
    
    // TODO: Возможно, отправить запрос на API для обновления статусов на бэкенде
  }

  // Вычисляемое свойство для проверки наличия непрочитанных уведомлений
  get hasUnread(): boolean {
    return this.notifications.some(n => !n.read);
  }

  addNotification(notification: Notification) {
    const readNotifications = JSON.parse(localStorage.getItem('readNotifications') || '[]')
    const allNotificationIds = this.notifications.map(n => n.id)
    const ids: string[] = [...readNotifications, ...allNotificationIds]

    if (ids.includes(notification.id)) return

    this.notifications.push(notification)
  }
} 