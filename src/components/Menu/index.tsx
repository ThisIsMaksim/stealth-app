import {useCallback} from "react"
import {
  Article,
  User as UserIcon,
  Chats, LinkedinLogo,
  PresentationChart, Users, Diamond, Gear, CaretDown,
} from 'phosphor-react'
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarItem,
  SidebarList,
  NavbarBrand,
  Label,
  Button,
  Dropdown,
  DropdownAction,
  DropdownContent,
  DropdownGroup,
  DropdownItem,
  Divider,
  Card, SidebarDropdown, SidebarCollapse, SidebarDropdownList, CardContent, toast
} from 'keep-react'
import {Link, useLocation} from "react-router-dom"
import {IUser} from "../../types/User.type"
import {useStores} from "../../stores"
import {ModalType} from "../../stores/modal.store"
import {observer} from "mobx-react"
import {PulseLoader} from "react-spinners"
import logo from '../../assets/logo.png'
import {User} from "../User"
import {ComponentProps} from "../../types/Component"
import {UpgradePlan} from "../UpgradePlan"
import {Action, fetchWithDelay} from "../../utils/fetchWithDelay.ts";

export const Menu = ({ className }: ComponentProps) => {
  const { UserStore, ModalStore, FirebaseStore } = useStores()
  const location = useLocation()

  const handleBindLinkedInAccount = useCallback(() => {
    ModalStore.open(
      ModalType.BindLinkedInAccount,
      {
        locations: UserStore.locations,
      },
      () => UserStore.needCheckLinkedinAccountStatus = false
    )
  }, [UserStore, ModalStore])
  const handleUnBindLinkedInAccount = useCallback(() => {
    // eslint-disable-next-line no-async-promise-executor
    const promise = () => new Promise<void>(async (resolve, reject) => {
      const result = await fetchWithDelay<void, Action<void>>(
        UserStore.unBindLinkedinAccount.bind(UserStore),
        undefined,
      )

      if (result.error) {
        reject()
      } else {
        resolve()
      }
    })

    toast.promise(promise, {
      loading: 'Doing...',
      success: 'Done',
      error: 'Something went wrong',
    })
  }, [UserStore])

  return (
    <Sidebar className={`${className} min-w[220px] max-w-[250px] lg:max-w-[220px] h-[calc(100%)] lg:h-[calc(100%-32px)]`}>
      <SidebarBody>
        <NavbarBrand className="flex flex-row items-center gap-1">
          <Card>
            <img
              className="flex-shrink-0 w-[32px] h-[32px]"
              src={logo}
              alt="logo"
            />
          </Card>
          <Label className="text-heading-5">ELVYN.ai</Label>
        </NavbarBrand>
        <Divider className="w-[100%]"/>
        <SidebarList>
          <SidebarItem className="text-start" dropdown>
            <SidebarDropdown open>
              <SidebarCollapse>
                <div id="workspace" className="flex items-center gap-3 text-start">
                  <span>
                    <PresentationChart size={20}/>
                  </span>
                  <span>Workspace</span>
                </div>
                <span className="hidden lg:flex group-open:-rotate-180">
                  <CaretDown size={16}/>
                </span>
              </SidebarCollapse>

              <SidebarDropdownList>
                <Link to="/workspace/audience">
                  <SidebarItem className={location.pathname === '/workspace/audience' ? 'text-blue-500' : ''}>
                    <Users size={16}/>
                    Audience
                  </SidebarItem>
                </Link>
                <Link to="/workspace/about-company">
                  <SidebarItem id="about-company" className={location.pathname === '/workspace/about-company' ? 'text-blue-500' : ''}>
                    <Article size={16} />
                    About company
                  </SidebarItem>
                </Link>
                <Link to="/workspace/about-you">
                  <SidebarItem id="about-you" className={location.pathname === '/workspace/about-you' ? 'text-blue-500' : ''}>
                    <UserIcon size={16} />
                    About you
                  </SidebarItem>
                </Link>
                {FirebaseStore.config['tone_of_voice'] && (
                  <Link to="/workspace/tone-of-voice">
                    <SidebarItem className={location.pathname === '/workspace/tone-of-voice' ? 'text-blue-500' : ''}>
                      <Diamond size={16}/>
                      Tone of voice
                    </SidebarItem>
                  </Link>
                )}
                <Link to="/workspace/settings">
                  <SidebarItem className={location.pathname === '/workspace/settings' ? 'text-blue-500' : ''}>
                    <Gear size={16} />
                    Settings
                  </SidebarItem>
                </Link>
              </SidebarDropdownList>
            </SidebarDropdown>
          </SidebarItem>
          <Link to="/comments">
            <SidebarItem id="posts" className={location.pathname === '/comments' ? 'text-blue-500' : ''}>
              <Chats size={20}/>
              Comments
            </SidebarItem>
          </Link>
        </SidebarList>
        <Subscribe />
      </SidebarBody>
      <SidebarFooter className="flex flex-col gap-4 items-start">
        <LinkedIn
          user={UserStore.user}
          handleUnBindLinkedInAccount={handleUnBindLinkedInAccount}
          handleBindLinkedInAccount={handleBindLinkedInAccount}
        />
        <Divider className="w-[100%] lg:hidden"/>
        <User className="lg:hidden" />
      </SidebarFooter>
    </Sidebar>
  )
}

interface LinkedInProps {
  user: IUser
  handleBindLinkedInAccount: () => void
  handleUnBindLinkedInAccount: () => void
}

const LinkedIn = observer((props: LinkedInProps) => {
  const {user, handleBindLinkedInAccount, handleUnBindLinkedInAccount} = props

  if (!user?.linkedin_account) {
    return (
      <Button variant="outline" className="flex flex-row gap-1 p-4" onClick={handleBindLinkedInAccount}>
        <LinkedinLogo size={28}/>
        LinkedIn connect
      </Button>
    )
  }

  if (user?.linkedin_account?.status === 'new') {
    return (
      <Card className="dark:border-gray-700">
        <CardContent className="flex flex-col justify-center text-center w-[100%] space-y-3 p-4 bg-emerald-400 dark:bg-emerald-600 text-white">
          <LinkedinLogo size={28}/>
          <div>
            <p className="text-body-4 font-medium text-metal-400 text-start dark:text-white">
              Try to connect
            </p>
            <p
              className="w-[150px] text-body-4 font-normal text-metal-300 text-start dark:text-metal-400 lowercase overflow-hidden whitespace-nowrap"
              style={{textOverflow: 'ellipsis'}}
            >
              <PulseLoader size={8} color="rgb(27, 77, 255)" />
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Dropdown>
      <DropdownAction asChild>
        <Button variant="outline" color="success" className="flex flex-row justify-start items-center w-full gap-1 text-start">
          <LinkedinLogo size={28} className="ml-2" />
          <p
            className="w-[130px] text-body-2 font-normal text-start lowercase overflow-hidden whitespace-nowrap"
            style={{textOverflow: 'ellipsis'}}
          >
            {user.linkedin_account?.status}
          </p>
        </Button>
      </DropdownAction>
      <DropdownContent align="start" className="p-2 border border-metal-100 dark:border-metal-800 dark:bg-gray-900">
        <DropdownGroup>
          <DropdownItem onClick={handleUnBindLinkedInAccount}>
            Unbind
          </DropdownItem>
          <DropdownItem onClick={handleBindLinkedInAccount}>
            Reconnect
          </DropdownItem>
        </DropdownGroup>
      </DropdownContent>
    </Dropdown>
  )
})

const Subscribe = observer(() => {
  const { FirebaseStore } = useStores()

  if (!FirebaseStore.config['stripe']) return null

  return (
    <Card className="dark:border-gray-700">
      <CardContent className="flex flex-col justify-center text-center w-[100%] space-y-3 p-4 bg-emerald-400 dark:bg-emerald-600 text-white">
        <div>Trial will expire in <br/> 7 days</div>
        <UpgradePlan />
      </CardContent>
    </Card>
  )
})
