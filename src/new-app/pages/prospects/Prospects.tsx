import React from 'react'
import { PageWrapper } from '../../components/PageWrapper'
import { Profile } from '../../components/Profile'
import { SelectCampaign } from '../../components/SelectCampaign'
import { Menu } from '../../components/Menu'
import { AddProspects } from '../../components/AddProspects'
import { Prospects } from '../../components/Prospects'

const ProspectsPage: React.FC = () => {
  return (
    <PageWrapper
      leftBlock={
        <>
          <Profile />
          <Menu />
        </>
      }
      centerBlock={<Prospects />}
      rightBlock={
        <>
          <SelectCampaign />
          <AddProspects />
        </>
      }
    />
  )
}

export default ProspectsPage; 