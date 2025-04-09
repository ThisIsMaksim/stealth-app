import { observer } from "mobx-react"
import { IComment, IPost, IPostWithComment } from "../types/Post.type"
import { useCallback, useEffect, useRef, useState } from "react"
import { useStores } from "../stores"
import {Avatar, AvatarProps, Button, Icon, Select, Skeleton, TextArea, ToastProps, useToaster} from '@gravity-ui/uikit'
import {Card} from '@gravity-ui/uikit'
import {Text} from '@gravity-ui/uikit'
import { ComponentProps } from "../types/Component"
import { Images } from "./Comments/Post/Images"
import { ModalType } from "../stores/modal.store"
import { fetchWithDelay, Action } from "../utils/fetchWithDelay"
import { Article, Chats, Diamond, Gear, Users, User as UserIcon, } from "phosphor-react"
import { LinkedinAccountStatus } from "../types/LinkedinAccount.type"
import { Logo } from "../components/Logo"
import {ArrowRightFromLine} from '@gravity-ui/icons'
import {Loader} from '@gravity-ui/uikit'
import { IApprovePostRequest, IRejectPostRequest } from "../stores/posts.store"
import { ICampaign } from "../types/Campaigns.type"
import { useNavigate } from "react-router-dom"

interface CommentProps {
    postId: string
    comment: IComment
}

const Comment = observer(({postId, comment}: CommentProps) => {
    const { UserStore, ModalStore, PostsStore } = useStores()
    const [text, setText] = useState(comment.content)
    const [isApprovePending, setApprovePending] = useState(false)
    const [isRejectPending, setRejectPending] = useState(false)
    const [isRegeneratePending, setRegeneratePending] = useState(false)
    const {add} = useToaster()

    const openBindLinkedInAccountModal = useCallback(() => {
        ModalStore.open(
            ModalType.BindLinkedInAccount,
            {
              locations: UserStore.locations,
            },
            () => UserStore.needCheckLinkedinAccountStatus = false
          )
    }, [ModalStore, UserStore])

    const handleApprove = useCallback(async () => {
        if (!UserStore.user.linkedin_account) {
            openBindLinkedInAccountModal()
    
          return
        }
    
        setApprovePending(true)

        const request = {
            postId: postId,
            commentId: comment.id,
            comment: text,
            reaction: undefined
        }
    
        const result = await fetchWithDelay<IApprovePostRequest, Action<string>>(
            PostsStore.approvePost.bind(PostsStore),
            request,
        )

        setApprovePending(false)
    
        PostsStore.changePostStatus(postId, 'pending')

        const toast: ToastProps = !result.error
            ? {
                name: 'succes approve comment',
                title: 'Comment sent for publication',
                content: 'This usually happens quickly, but can take up to 15 minutes',
                theme: 'success',
            }
            : {
                name: 'failed approve comment',
                title: 'Failed to publish comment',
                content: 'Please try again later',
                theme: 'danger',
            }
    
            add(toast)
    }, [PostsStore, postId, comment, text])

    const handleReject = useCallback(async () => {
        if (!UserStore.user.linkedin_account) {
            openBindLinkedInAccountModal()
    
          return
        }
    
        setRejectPending(true)

        const request = {
            postId: postId,
            commentId: comment.id,
        }
    
        const result = await fetchWithDelay<IRejectPostRequest, Action<string>>(
            PostsStore.rejectPost.bind(PostsStore),
            request,
        )

        setRejectPending(false)
    
        PostsStore.changePostStatus(postId, 'rejected')

        const toast: ToastProps = !result.error
            ? {
                name: 'succes reject comment',
                title: 'Comment was rejected',
                theme: 'success',
            }
            : {
                name: 'failed reject comment',
                title: 'Failed to reject comment',
                content: 'Please try again later',
                theme: 'danger',
            }
    
            add(toast)
    }, [PostsStore, postId, comment, text])

    return (
        <>
            <TextArea
                className="bg-white rounded-md"
                size="l"
                minRows={6}
                maxRows={16}
                value={text}
                onUpdate={(value) => setText(value)}
            />
            <div className="flex gap-2 mt-4">
                <Button view="outlined-success" size="l" loading={isApprovePending} onClick={handleApprove}>
                    Approve
                </Button>
                <Button view="outlined-danger" size="l" loading={isRejectPending} onClick={handleReject}>
                    Reject
                </Button>
                <Button view="outlined-action" size="l" loading={isRegeneratePending}>
                    Regenerate
                </Button>
            </div>
        </>
    )
})

interface PropsPost {
    post: IPost
    comment: IComment
    isReactionOnPost?: boolean
}
  
export const Post = observer((props: PropsPost) => {
    const {post, comment} = props
    const {author, content} = post
    const hasSharedContent = !!post.shared_content

    return (
        <Card className="p-4 max-w-[650px] space-y-2" view="filled" type="container">
            <User name={author.name} subtitle={author.position} avatarSrc={author.avatar_url} />
            <PostContent className="text-start" content={content} />
            {!hasSharedContent && <Images images={post.image_urls}/>}
            <Comment postId={post.id} comment={comment} />
        </Card>
    )
})

interface UserProps extends ComponentProps {
    name: string
    subtitle: string
    avatarSrc?: string
}

export const User = ({ name, subtitle, avatarSrc, className }: UserProps) => {
    let avatarProps: AvatarProps =
        !!avatarSrc
            ? {imgUrl: avatarSrc, size: "l"}
            : {text: name, size: "l", borderColor: 'var(--g-color-line-misc)'}

    return (
        <div className={`flex flex-row gap-2 ${className}`}>
            <Avatar className="shrink-0" {...avatarProps} />
            <div className="flex flex-col items-start justify-center">
                <Text variant="body-1">{name}</Text>
                <Text className="text-start opacity-50" variant="caption-2">{subtitle}</Text>
            </div>
        </div>
    )
}

interface PostContentProps extends ComponentProps {
    content: string
}

export const PostContent = ({ content, className }: PostContentProps) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)
    const [isOverflowing, setIsOverflowing] = useState(false)

    useEffect(() => {
        if (contentRef.current) {
            const { scrollHeight, clientHeight } = contentRef.current
            setIsOverflowing(scrollHeight > clientHeight)
        }
    }, [content])

    return (
        <div>
            <div 
                ref={contentRef}
                className={`${className} ${!isExpanded ? 'line-clamp-3' : ''}`}
                dangerouslySetInnerHTML={{__html: content}}
            />
            {isOverflowing && (
                <div className="flex flex-row justify-start w-full">
                    <Button
                        className="mt-2 ml-[-6px]"
                        view="flat-info"
                        size="xs"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? 'Show less' : 'Show more'}
                    </Button>
                </div>
            )}
        </div>
    )
}

export const Menu = observer(() => {
    return (
        <Card className="flex flex-col items-center w-[250px] h-fit space-y-2 p-4" view="filled" type="container">
        <div className="flex flex-col w-full space-y-2">
            <a 
                href="/posts" 
                className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    window.location.pathname === '/posts' ? 'text-blue-500' : ''
                }`}
            >
                <Chats size={20} />
                <span>Posts</span>
            </a>
            <a 
                href="/workspace/audience" 
                className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    window.location.pathname === '/workspace/audience' ? 'text-blue-500' : ''
                }`}
            >
                <Users size={20} />
                <span>Prospects</span>
            </a>
            <a 
                href="/workspace/settings" 
                className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    window.location.pathname === '/workspace/settings' ? 'text-blue-500' : ''
                }`}
            >
                <Gear size={20} />
                <span>Campaign Settings</span>
            </a>
            <a 
                href="/profile" 
                className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    window.location.pathname === '/workspace/settings' ? 'text-blue-500' : ''
                }`}
            >
                <UserIcon size={20} />
                <span>Profile</span>
            </a>
        </div>
        </Card>
    )
})

export const Profile = observer(() => {
    const { UserStore, ModalStore } = useStores()
    const user = UserStore.user

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

  switch (user?.linkedin_account?.status) {
    case undefined:
    case LinkedinAccountStatus.NEW:
        return (
            <Card className="flex flex-col items-center w-[250px] p-4" view="filled" type="container" theme="warning">
            <div className="flex flex-col items-center space-y-4 p-2 text-start">
                <Text variant="header-2" className="text-center">
                    Connect LinkedIn Account
                </Text>
                <Text variant="body-2" className="text-center opacity-75">
                    To use the full functionality of the application, you need to connect your LinkedIn account
                </Text>
                <Button
                    view="outlined"
                    size="l"
                    onClick={handleBindLinkedInAccount}
                    className="mt-4"
                >
                    Connect Account
                </Button>
            </div>
            </Card>
        )

      break
    case LinkedinAccountStatus.CONNECTED:
        return (
            <Card className="flex flex-col items-center w-[250px] p-4" view="filled" type="container" theme="success">
                <div className="flex flex-col items-center space-y-4 p-2 text-start">
                    <Text variant="header-2" className="text-center">
                        LinkedIn Account Connected
                    </Text>
                    <Text variant="body-2" className="text-center opacity-75">
                        Your LinkedIn account is successfully connected. You can now use all features of the application.
                    </Text>
                    {/* <Button
                        view="outlined"
                        size="l"
                        onClick={handleUnBindLinkedInAccount}
                        className="mt-4"
                    >
                        Disconnect Account
                    </Button> */}
                </div>
            </Card>
        )
    case LinkedinAccountStatus.ERROR:
        return (
            <Card className="flex flex-col items-center w-[250px] p-4" view="filled" type="container" theme="danger">
                <div className="flex flex-col items-center space-y-4 p-2 text-start">
                    <Text variant="header-2" className="text-center">
                        Connection Error
                    </Text>
                    <Text variant="body-2" className="text-center opacity-75">
                        An error occurred while connecting your LinkedIn account. Please try again.
                    </Text>
                    <Button
                        view="outlined"
                        size="l"
                        onClick={handleBindLinkedInAccount}
                        className="mt-4"
                    >
                        Try Again
                    </Button>
                </div>
            </Card>
        )
    default:
        return (
            <Card className="flex flex-col items-center w-[250px] p-4" view="filled" type="container" theme="danger">
                <div className="flex flex-col items-center space-y-4 p-2 text-start">
                    <Text variant="header-2" className="text-center">
                        Pending...
                    </Text>
                    <Loader className="mt-4" />
                </div>
            </Card>
        )

    }
})

export const SelectCampaign = () => {
  const { CampaignsStore, ModalStore } = useStores()
  const navigate = useNavigate()

  const handleSelectCampaign = useCallback((campaignId: string) => {
    const selectedCampaign = CampaignsStore.campaigns.find(c => c.id === campaignId)
    if (selectedCampaign) {
      CampaignsStore.setActiveCampaign(selectedCampaign)
    }
  }, [CampaignsStore])

  return (
    <Card className="flex flex-col items-center w-[250px] p-4" view="filled" type="container" theme="normal">
      <div className="flex flex-col items-center space-y-4 p-2 text-start">
        <Text variant="header-2" className="text-center">
          Your Campaign
        </Text>
        <Select
            className="w-full"
            value={[CampaignsStore.activeCampaign?.id || '']}
            onUpdate={(items: string[]) => handleSelectCampaign(items[0])}
            options={CampaignsStore.campaigns.map(campaign => ({
                value: campaign.id,
                content: campaign.name
            }))}
            placeholder="Select campaign"
            multiple={false}
            size="xl"
        />
        <div className="flex flex-row gap-4 mt-4">
            <Button
                view="action" 
                size="l"
                onClick={() => ModalStore.open(ModalType.CreateCampaign)}
            >
                Add Campaign
            </Button>
            <Button
                view="normal"
                size="l" 
                onClick={() => navigate('/campaign-settings')}
            >
                Settings
            </Button>
        </div>
      </div>
    </Card>
  )
}

export const AddProspects = () => {
    const { ModalStore } = useStores()

    const handleAddProspects = useCallback(() => {
        ModalStore.open(ModalType.OpenAddProspect)
    }, [ModalStore])

    return (
        <Card className="flex flex-col items-center w-[250px] p-4" view="filled" type="container" theme="normal">
            <div className="flex flex-col items-center space-y-4 p-2 text-start">
                <Text variant="header-2" className="text-center">
                    Add Prospects
                </Text>
                <Text variant="body-2" className="text-center opacity-75">
                    Add new prospects to start working with them
                </Text>
                <Button
                    view="action"
                    size="l"
                    onClick={handleAddProspects}
                    className="mt-4"
                >
                    Add Prospects
                </Button>
            </div>
        </Card>
    )
}

interface PostsProps {
    posts: IPostWithComment[]
}

const Posts = observer(({posts}: PostsProps) => {
    return (
        <div className="flex flex-col space-y-4">
            {posts.map((post, index) => (
                <Post
                    key={index}
                    post={post.post}
                    comment={post.comment}
                />
            ))}
        </div>
    )
})

interface HeaderProps extends ComponentProps {}

const Header = observer(({className}: HeaderProps) => {
  const { UserStore } = useStores()
  const user = UserStore.user

  const handleLogout = useCallback(async () => {
    UserStore.logout(
      () => {
        window.location.href= '/signin'
      }
    )
  }, [UserStore])

  return (
    <div className={`fixed top-0 z-10 flex items-center justify-between p-4 bg-white dark:bg-black border-b border-metal-100 dark:border-metal-800 ${className}`}>
      <div className="flex items-center space-x-4">
        <Logo />
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center gap-4">
          <User
            className="cursor-pointer"
            name={user?.name}
            subtitle={user?.email}
            avatarSrc={user?.linkedin_account?.avatar_url}
          />
          <Button
            className="flex items-center justify-center"
            view="flat"
            size="l"
            onClick={handleLogout}
            title="Logout"
          >
            <ArrowRightFromLine />
          </Button>
        </div>
      </div>
    </div>
  )
})

interface LoadMorePostsProps {
    chooseStatus: string
}

const LoadMorePosts = ({chooseStatus}: LoadMorePostsProps) => {
    const { CampaignsStore, PostsStore } = useStores()
    const offset = useRef(0)
    const canLoadMore = useRef(true)

    const handleFetchMorePosts = useCallback(() => {
        PostsStore.fetchPosts(CampaignsStore.activeCampaign.id, chooseStatus, offset.current)
    }, [CampaignsStore.activeCampaign, PostsStore])

    const handleLoadMorePosts = useCallback(() => {
        offset.current = offset.current + 10

        handleFetchMorePosts()
    }, [offset])

    useEffect(() => {
        offset.current = 0
    }, [chooseStatus])

    if (PostsStore.ended) return <div className="h-[50px]" />

    return (
        <div
            className="mt-8 mb-8"
            ref={(node) => {
                if (node) {
                const observer = new IntersectionObserver(([entry]) => {
                    if (entry.isIntersecting) {
                    if (canLoadMore.current === true && PostsStore.state === 'done') {
                        handleLoadMorePosts()

                        canLoadMore.current = false

                        setTimeout(() => canLoadMore.current = true, 1000)
                    }
                    }
                })
                observer.observe(node)
                }
            }}
            >
                <Loader />
        </div>
    )
}

const PostsSkeleton = () => (
  <div className="space-y-4 w-[100vw] max-w-[650px]">
    {Array.from({length: 3}).map((_, index) => (
      <Skeleton className="w-full h-[250px]" />
    ))}
  </div>
)

const WelcomeEmptyState = () => (
  <Card className="flex flex-col items-center justify-center w-[100vw] max-w-[650px] h-[500px] p-8">
    <div className="text-9xl pt-4">👋🎉</div>
    <h2 className="mb-[14px] mt-5 text-2xl font-semibold text-center">Welcome!</h2>
    <p className="text-gray-600 text-center mb-8">
      Start adding your first prospects to see them here.
    </p>
    <Button view="action" size="xl">
      Add first prospect
    </Button>
  </Card>
)

const EmptyComponent = ({ title }: { title: string }) => (
  <Card className="flex flex-col items-center justify-center w-[100vw] max-w-[650px] h-[500px] p-8">
    <img
      src="https://staticmania.cdn.prismic.io/staticmania/16994ca5-ac01-4868-8ade-1b9e276ccdb3_Property+1%3DFolder_+Property+2%3DLg.svg"
      className="pt-4"
      height={234}
      width={350}
      alt="empty"
    />
    <h2 className="mb-[14px] mt-5 text-xl font-semibold">{title}</h2>
  </Card>
)

export const PostsPage = observer(() => {
    const { CampaignsStore, PostsStore, UserStore, ProspectsStore } = useStores()
    const items = PostsStore.postsWithComments
    const [chooseStatus, setShooseStatus] = useState('draft')
    const [enteredAuthorName, setEnteredAuthorName] = useState('all')
    const posts = items
        .filter(post => post.comment.status === chooseStatus && (enteredAuthorName === 'all' || post.post.author.name === enteredAuthorName))

    useEffect(() => {
        if (UserStore.authorized) return
    
        UserStore.fetchUser()
    }, [UserStore])

    useEffect(() => {
        if (!UserStore.authorized || !UserStore.user.is_confirmed) return
    
        CampaignsStore.fetchCampaigns()
      }, [UserStore.authorized, CampaignsStore])
    
    useEffect(() => {
        if (CampaignsStore.activeCampaign) {
            PostsStore.fetchPosts(CampaignsStore.activeCampaign.id, chooseStatus, 0)
            ProspectsStore.fetchProspects(CampaignsStore.activeCampaign.id)
        }
    }, [CampaignsStore.activeCampaign, PostsStore, chooseStatus])

    const headerHeight = 72
    let content = null

    if (PostsStore.state === 'pending' || ProspectsStore.state === 'pending') {
        content = <PostsSkeleton />
    } else if (ProspectsStore.prospects.length === 0) {
        content = <WelcomeEmptyState />
    } else if (!posts.length) {
        content = <EmptyComponent title={chooseStatus !== 'draft' ? "You don't have posts in this status" : "You don't have new posts"} />
    } else {
        content = (
            <>
                <Posts posts={posts} />
                <LoadMorePosts chooseStatus={chooseStatus} />
            </>
        )
    }

    return (
        <div className="relative flex flex-col items-center w-[100vw] h-[100vh] bg-white dark:bg-black overflow-y-auto m-[-16px]">
            <Header className={`w-full max-w-[1180px] h-[${headerHeight}px]`} />
            <div className="relative flex justify-between space-x-4 max-w-[1180px]" style={{marginTop: `${headerHeight + 16}px`}}>
                <div className="relative w-[250px] h-screen">
                    <div className={`fixed flex flex-col space-y-2`} style={{top: `${headerHeight + 14}px`}}>
                        <Profile />
                        <Menu />
                    </div>
                </div>
                <div className="flex-1">
                    {content}
                </div>
                <div className="relative w-[250px] h-screen">
                    <div className={`fixed flex flex-col space-y-2`} style={{top: `${headerHeight + 14}px`}}>
                        <SelectCampaign />
                        <AddProspects />
                    </div>
                </div>
            </div>
        </div>
    )
})
