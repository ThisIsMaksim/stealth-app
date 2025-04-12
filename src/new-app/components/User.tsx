import { Avatar, AvatarProps, Text } from '@gravity-ui/uikit'
import { ComponentProps } from '../../types/Component'
import { useNavigate } from 'react-router-dom'

interface UserProps extends ComponentProps {
    name: string
    subtitle: string
    avatarSrc?: string
}

export const User = ({ name, subtitle, avatarSrc, className }: UserProps) => {
    const navigate = useNavigate()

    let avatarProps: AvatarProps =
        !!avatarSrc
            ? {imgUrl: avatarSrc, size: "l"}
            : {text: name, size: "l", borderColor: 'var(--g-color-line-misc)'}

    return (
        <div onClick={() => navigate('/profile')}>
            <div id="profile" className={`flex flex-row gap-2 ${className}`}>
                <Avatar className="shrink-0" {...avatarProps} />
                <div className="flex flex-col items-start justify-center">
                    <Text variant="body-1">{name}</Text>
                    <Text className="text-start opacity-50" variant="caption-2">{subtitle}</Text>
                </div>
            </div>
        </div>
    )
} 