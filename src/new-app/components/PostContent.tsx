import { Button } from '@gravity-ui/uikit'
import { useEffect, useRef, useState } from "react"
import { ComponentProps } from '../../types/Component'

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