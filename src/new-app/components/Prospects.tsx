import React, { useCallback, useEffect, useMemo } from 'react'
import { 
  Table, 
  Text,
  Card,
  Avatar,
  withTableActions,
  TableActionConfig,
  Label,
  Skeleton,
  Button,
  Loader,
  Tooltip
} from '@gravity-ui/uikit'
import { useStores } from '../../stores'
import { observer } from 'mobx-react'
import { IProspect } from '../../types/Prospects.type'
import { ModalType } from '../../stores/modal.store'
import Lottie from 'react-lottie'
import emptyLottie from "../../assets/lottie/empty.json"

const defaultOptions = {
    loop: false,
    autoplay: true, 
    animationData: emptyLottie,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
}

interface EmptyComponentProps {
    addProspect: () => void
}

const EmptyComponent = ({addProspect}: EmptyComponentProps) => (
    <div>
      <Lottie
            options={defaultOptions}
            height={400}
            width={400}
        />
      <div className="flex flex-col mt-4">
        <Text variant="header-1" className="mb-[14px]">You don't have any prospects yet</Text>
        <Text variant="body-1">
            Add the prospects to your campaign to start using them
        </Text>
      </div>
      <Button
        view="action"
        size="l"
        className="flex gap-1.5 mt-4 mb-4"
        onClick={() => addProspect()}
      >
        Add prospect
      </Button>
    </div>
)
  
export const Prospects: React.FC = observer(() => {
    const {CampaignsStore, ProspectsStore, ModalStore} = useStores()
    const ProspectsTable = withTableActions(Table)
    const prospects = ProspectsStore.prospects.filter((prospect) => !prospect.is_private)
    const state = ProspectsStore.state
    const isEmpty = useMemo(() => state === 'done' && prospects.length === 0 , [prospects, state])
    const isLoading = useMemo(() => state !== 'done' && prospects.length === 0, [prospects, state])

    const handleAddProspects = useCallback(() => {
        ModalStore.open(ModalType.OpenAddProspect)
    }, [ModalStore])

    const columns = [
        {
            id: 'avatar',
            name: '',
            template: (item) => (
                !!item.name ? (
                    <Avatar imgUrl={item.avatar_url} />
                ) : (
                    <div className="flex items-center gap-2">
                        <Loader />
                    </div>
                )
            ),
        },
        {
            id: 'name',
            name: 'Name',
            template: (item) => (
                !!item.name ? (
                    <div className="flex items-center">
                        <Text>{item.name}</Text>
                    </div>
                ) : (
                  <Tooltip content={
                    <div>
                      <p>Prospect is in the process of enrichment,</p>
                      <p>it usually takes some time.</p>
                    </div>
                  } openDelay={100}>
                    <Text>Enriching...</Text>
                  </Tooltip>
                )
            ),
        },
        {
            id: 'position',
            name: 'Position',
            className: 'w-full',
            template: (item) => !!item.name ? <Text className="whitespace-normal">{item.position || '-'}</Text> : '...',
        },
    ]
    const getRowActions: (item: IProspect, index: number) => TableActionConfig<IProspect>[] = () => {
        return [
            {
                text: 'open in LinkedIn',
                handler: (item) => {
                    window.open(item.link_url, '_blank')
                },
            },
            {
                text: 'remove',
                handler: (item) => {
                    ProspectsStore.removeProspect({campaign_id: CampaignsStore.activeCampaign.id, prospect_id: item.id})
                },
                theme: 'danger',
            },
        ]
    }

    useEffect(() => {
        if (CampaignsStore.activeCampaign) {
          ProspectsStore.fetchProspects(CampaignsStore.activeCampaign.id)
        }
    }, [CampaignsStore.activeCampaign, ProspectsStore])

    return (
        <Card className="flex flex-col justify-start w-[100vw] max-w-[650px] p-4 mb-4" view="filled" type="container" theme="normal">
            <div className="flex flex-row justify-start gap-2">
                <Text variant="header-1" className="text-start mb-4">
                    Prospects
                </Text>
                <Label theme="success">{!isLoading ? prospects.length : '...'}</Label>
            </div>
            {isLoading ? (
                <div className="space-y-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            ) : isEmpty ? (
                <EmptyComponent
                    addProspect={handleAddProspects}
                />
            ) : (
                <ProspectsTable
                    data={prospects}
                    columns={columns}
                    getRowActions={getRowActions}
                />
            )}
        </Card>
    )
})
