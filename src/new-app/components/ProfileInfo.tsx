import { Card, Text, Button, Avatar } from '@gravity-ui/uikit'
import { SignOut, LinkedinLogo } from 'phosphor-react'
import { LinkedinAccountStatus } from '../../types/LinkedinAccount.type'
import { IUser } from '../../types/User.type'
import { useStores } from '../../stores'
import { ModalType } from '../../stores/modal.store'
import { useCallback } from 'react'
import { fetchWithDelay, Action } from '../../utils/fetchWithDelay'
import { SubscriptionStatus } from '../../types/Subscriptions.type'
import { useNavigate } from 'react-router-dom'
import { ProfileAttributes } from './ProfileAttributes'

interface ProfileInfoProps {
  user: IUser
  onLogout: () => void
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ user, onLogout }) => {
  const { UserStore, ModalStore } = useStores()
  const navigate = useNavigate()

  const handleBindLinkedInAccount = useCallback(() => {
    ModalStore.open(
      ModalType.BindLinkedInAccount,
      {
        locations: UserStore.locations,
      },
      () => UserStore.needCheckLinkedinAccountStatus = false
    )
  }, [UserStore, ModalStore])

  const handleUnBindLinkedInAccount = useCallback(async () => {
    await fetchWithDelay<void, Action<void>>(
      UserStore.unBindLinkedinAccount.bind(UserStore),
      undefined,
    )
  }, [UserStore])

  return (
    <div className="flex flex-col gap-6 w-[100vw] max-w-[650px]">
      <Card view="filled" type="container" theme="normal" className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Avatar 
            size="xl" 
            imgUrl={user?.linkedin_account?.avatar_url} 
            text={user?.name?.slice(0, 2)}
          />
          <div className='flex flex-col text-start'>
            <Text variant="header-2">{user?.name}</Text>
            <Text variant="body-2" color="secondary">{user?.email}</Text>
          </div>
        </div>
        <div className="border-b border-gray-400 mb-4"></div>
        <div className="flex justify-between items-center mb-2">
          <Text variant="header-1" className="text-start">LinkedIn account</Text>
          {user?.linkedin_account ? (
            <Button
              view="outlined-danger"
              size="m"
              onClick={handleUnBindLinkedInAccount}
            >
              <div className="flex flex-row items-center justify-center">
                <LinkedinLogo size={16} className="mr-2" />
                Unlink
              </div>
            </Button>
          ) : (
            <Button
              view="outlined"
              size="m"
              onClick={handleBindLinkedInAccount}
            >
              <div className="flex flex-row items-center justify-center">
                <LinkedinLogo size={16} className="mr-2" />
                Connect
              </div>
            </Button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 text-start">
          <div className="flex flex-row gap-1 items-center">
            <Text variant="body-2" color="secondary">Status</Text>
            <Text variant="body-1">
              {user?.linkedin_account?.status === LinkedinAccountStatus.CONNECTED ? 'Connected' : 'Not Connected'}
            </Text>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <Text variant="body-2" color="secondary">Position</Text>
            <Text variant="body-1">{user?.linkedin_account?.name || 'Not specified'}</Text>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <Text variant="body-2" color="secondary">Location</Text>
            <Text variant="body-1">{user?.linkedin_account?.location || 'Not specified'}</Text>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <Text variant="body-2" color="secondary">Profile URL</Text>
            <Text variant="body-1">
              {user?.linkedin_account?.linkedin_url ? (
                <a 
                  href={user.linkedin_account.linkedin_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Open Profile
                </a>
              ) : 'Not specified'}
            </Text>
          </div>
        </div>
      </Card>

      <Card view="filled" type="container" theme="normal" className="p-6 text-start">
        <div className="flex justify-between items-center mb-4">
          <Text variant="header-1" className="text-start">Personal context</Text>
        </div>
        <div className="space-y-4">
          <ProfileAttributes
            title="How do I introduce myself? Who I am?"
            fieldName="introduce"
            description="My name is Nikita Gavrilov, general manager of Yango Autonomy, company providing with autonomous delivery robots. I have built multiple startups within the corporate. I call myself 'zero to one' guy.'"
          />
          <ProfileAttributes
            title="What personal attributes of experiences make me approachable?"
            fieldName='attributes'
            description="I live in Dubai with my wife who travels with me in all new destinations where I make new business starts."
          />
          <ProfileAttributes
            title="What are my interests and hobbies?"
            fieldName='hobbies'
            description="I am a visioner who beleives in developing the product which makes people life safer and better."
          />
          <ProfileAttributes
            title="How do I prefer to communicate?"
            fieldName='how_to_communicate'
            description="I prefer an informal, relaxed tone. I avoid corporate jargon and try to keep things simple and friendly."
          />
          <ProfileAttributes
            title="What's my background and experience?"
            fieldName='background'
            description="I've been involved in the fast developing industries, building products in mobility for last 7 years."
          />
        </div>
      </Card>

      <Card view="filled" type="container" theme="normal" className="p-6">
        <div className="flex justify-between items-center mb-4">
          <Text variant="header-1" className="text-start">Subscription</Text>
          {/* {user?.subscription?.isPremium && (
            <div className="flex items-center gap-2">
              <Crown size={20} weight="fill" className="text-yellow-500" />
              <Text variant="body-1">Premium</Text>
            </div>
          )} */}
        </div>
        <div className="grid grid-cols-2 gap-4 text-start">
          <div className="flex flex-row gap-1 items-center">
            <Text variant="body-2" color="secondary">Status</Text>
            <Text variant="body-1">
              {user?.subscription?.status === SubscriptionStatus.ACTIVE ? 'Active' : 'Inactive'}
            </Text>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <Text variant="body-2" color="secondary">Next Payment</Text>
            <Text variant="body-1">
              {user?.subscription?.end_ts || 'Not specified'}
            </Text>
          </div>
          <div className="col-span-2">
            <Button
              view={user?.subscription?.status === SubscriptionStatus.ACTIVE ? "outlined-danger" : "action"}
              size="m"
              onClick={() => navigate('/subscribe')}
            >
              {user?.subscription?.status === SubscriptionStatus.ACTIVE ? 'Unsubscribe' : 'Subscribe'}
            </Button>
          </div>
        </div>
      </Card>
      <div className="flex justify-end w-full mb-4">
        <Button
          className="max-w-[100px]"
          view="outlined-danger"
          size="l"
          onClick={onLogout}
        >
          <div className="flex flex-row items-center justify-center">
            <SignOut size={16} className="mr-2" />
            Logout
          </div>
        </Button>
      </div>
    </div>
  )
} 