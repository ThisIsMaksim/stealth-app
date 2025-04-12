import React from 'react'
import { PageWrapper } from '../../components/PageWrapper'
import { Menu } from "../../components/Menu"
import { Profile } from "../../components/Profile"
import { observer } from 'mobx-react'
import { useStores } from '../../../stores'
import { ProfileInfo } from '../../components/ProfileInfo'
import { SelectCampaign } from '../../components/SelectCampaign'

export const ProfilePage: React.FC = observer(() => {
  const { UserStore } = useStores()
  const user = UserStore.user

  const handleLogout = () => {
    UserStore.logout(() => {
      window.location.href = '/signin'
    })
  }

  return (
    <PageWrapper
      leftBlock={
        <>
          <Profile />
          <Menu />
        </>
      }
      centerBlock={
        <ProfileInfo 
          user={user} 
          onLogout={handleLogout}
        />
      }
      rightBlock={
        <>
          <SelectCampaign />
        </>
      }
    />
  )
})