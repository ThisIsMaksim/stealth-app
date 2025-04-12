import React from 'react'
import { PageWrapper } from '../../components/PageWrapper'
import { Profile } from '../../components/Profile'
import { SelectCampaign } from '../../components/SelectCampaign'
import { CampaignInfo } from '../../components/CampaignInfo'
import { Menu } from '../../components/Menu'

const CampaignSettings: React.FC = () => {
  return (
    <PageWrapper
      leftBlock={
        <>
          <Profile />
          <Menu />
        </>
      }
      centerBlock={<CampaignInfo />}
      rightBlock={
        <>
          <SelectCampaign />
        </>
      }
    />
  )
}

export default CampaignSettings; 