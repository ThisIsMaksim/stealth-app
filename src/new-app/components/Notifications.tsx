import { observer } from 'mobx-react'
import { Button, List, Icon, Text, Card } from '@gravity-ui/uikit'
import { CircleCheck, CircleCheckFill } from '@gravity-ui/icons'
import { useStores } from '../../stores'
import { useCallback } from 'react'
import { ComponentProps } from '../../types/Component'
import Lottie from 'react-lottie'
import notificationLottie from "../../assets/lottie/notification.json"

interface NotificationsProps extends ComponentProps {
  // Можно добавить пропсы для кастомизации при необходимости
}

const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: notificationLottie,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

export const Notifications = observer(({ className }: NotificationsProps) => {
  const { NotificationStore } = useStores()
  const notifications = NotificationStore.notifications.filter((notification) => !notification.read)

  const handleMarkAsRead = useCallback((id: string) => {
    NotificationStore.markAsRead(id)
  }, [NotificationStore])

  const handleMarkAllAsRead = useCallback(() => {
    NotificationStore.markAllAsRead()
  }, [NotificationStore])

  return (
    <div className={`flex flex-col w-80 max-h-96 ${className}`}>
      <div className="flex-grow overflow-y-auto p-4">
        {notifications.length === 0 ? (
          <div className="flex flex-col">
            <Lottie options={defaultOptions}
              height={200}
              width={200}
            />
            <div className="text-center text-gray-500 dark:text-gray-400 py-4">Notification list is empty</div>
          </div>
        ) : (
          <List
            itemClassName="mt-2 mb-2 rounded-lg"
            items={notifications}
            renderItem={(item) => (
              <div>
                <Card view="filled" type="container" theme="normal" className={`flex items-center justify-between p-2 ${item.read ? 'opacity-60' : ''}`}>
                    <Text className="flex-grow mr-2">
                        {item.text}
                    </Text>
                    {!item.read && (
                    <Button
                        size="s"
                        view="flat-secondary"
                        onClick={() => handleMarkAsRead(item.id)}
                        title="Read"
                    >
                        <Icon data={CircleCheck} size={16} />
                    </Button>
                    )}
                    {item.read && (
                    <Icon data={CircleCheckFill} size={16} className="text-green-500"/>
                    )}
                </Card>
              </div>
            )}
            virtualized={false}
          />
        )}
      </div>
      {notifications.length > 0 && (
        <div className="border-t border-metal-100 dark:border-metal-800 p-2">
          <Button width="max" view="action" onClick={handleMarkAllAsRead}>
            Read all
          </Button>
        </div>
      )}
    </div>
  )
}) 