import { observer } from 'mobx-react'
import { List, Text, Card } from '@gravity-ui/uikit'
import { useStores } from '../../stores'
import { ComponentProps } from '../../types/Component'
import Lottie from 'react-lottie'
import operationsLottie from "../../assets/lottie/empty.json"

const defaultOptions = {
  loop: false,
  autoplay: true, 
  animationData: operationsLottie,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

interface OperationsProps extends ComponentProps {}

export const Operations = observer(({ className }: OperationsProps) => {
  const {OperationsStore} = useStores()
  const operations = OperationsStore.operations

  const truncateText = (text: string, maxLines: number) => {
    const lines = text.split('\n')
    if (lines.length <= maxLines) return text
    return lines.slice(0, maxLines).join('\n') + '...'
  }

  return (
    <div className={`flex flex-col w-80 max-h-96 ${className}`}>
      <div className="flex-grow overflow-y-auto p-4">
        {operations.length === 0 ? (
          <div className="flex flex-col">
            <Lottie options={defaultOptions}
              height={200}
              width={200}
            />
            <div className="text-center text-gray-500 dark:text-gray-400 py-4">No active operations</div>
          </div>
        ) : (
          <List
            itemClassName="mt-2 mb-2 rounded-lg"
            items={operations}
            renderItem={(item) => (
              <div className="w-[300px]">
                <Card view="filled" type="container" theme="normal" className="p-2">
                  <Card className="w-[270px] p-2 mb-2 whitespace-pre-wrap" view="raised" type="container" theme="info">
                    Comment is being processed. It will be published within 15 minutes.
                  </Card>
                  <div className="flex items-center gap-2 mb-2">
                    <img 
                      src={item.post.author.avatar_url} 
                      alt={item.post.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex flex-col">
                      <Text variant="subheader-2">{item.post.author.name}</Text>
                      <Text color="secondary">{item.post.author.position}</Text>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="line-clamp-3" dangerouslySetInnerHTML={{__html: item.post.content}} />
                  </div>
                  <div className="mb-2">
                    <Text color="secondary" className="line-clamp-3">{truncateText(item.comment.content, 3)}</Text>
                  </div>
                </Card>
              </div>
            )}
            virtualized={false}
          />
        )}
      </div>
    </div>
  )
}) 