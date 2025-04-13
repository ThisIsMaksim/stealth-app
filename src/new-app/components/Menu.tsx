import { observer } from "mobx-react"
import { Card } from '@gravity-ui/uikit'
import { Chats, Gear, Users, User as UserIcon } from "phosphor-react"
import { useNavigate } from "react-router-dom"

export const Menu = observer(() => {
    const navigate = useNavigate()

    return (
        <Card className="flex flex-col items-center w-[250px] h-fit space-y-2 p-4" view="filled" type="container">
        <div className="flex flex-col w-full space-y-2">
            <div 
                onClick={() => navigate('/posts')}
                className="w-full cursor-pointer"
            >
                <div className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                    window.location.pathname === '/posts' ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-black dark:text-white'
                }`}>
                    <Chats size={20} />
                    <span>Posts</span>
                </div>
            </div>
            <div 
                onClick={() => navigate('/prospects')}
                className="w-full cursor-pointer"
            >
                <div className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                    window.location.pathname === '/prospects' ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-black dark:text-white'
                }`}>
                    <Users size={20} />
                    <span>Prospects</span>
                </div>
            </div>
            <div 
                onClick={() => navigate('/campaign-settings')}
                className="w-full cursor-pointer"
            >
                <div className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                    window.location.pathname === '/campaign-settings' ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-black dark:text-white'
                }`}>
                    <Gear size={20} />
                    <span>Campaign Settings</span>
                </div>
            </div>
            <div 
                onClick={() => navigate('/profile')}
                className="w-full cursor-pointer"
            >
                <div className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                    window.location.pathname === '/profile' ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-black dark:text-white'
                }`}>
                    <UserIcon size={20} />
                    <span>Profile</span>
                </div>
            </div>
        </div>
        </Card>
    )
}) 