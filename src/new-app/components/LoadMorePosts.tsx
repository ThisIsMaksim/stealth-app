import { useEffect, useRef, useCallback } from "react"
import { Loader } from '@gravity-ui/uikit'
import { useStores } from "../../stores"

interface LoadMorePostsProps {
    chooseStatus: string
}

export const LoadMorePosts = ({chooseStatus}: LoadMorePostsProps) => {
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