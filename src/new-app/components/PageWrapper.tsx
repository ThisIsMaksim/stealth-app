import { ReactNode } from "react"
import { Header } from "./Header"

interface PageWrapperProps {
    leftBlock: ReactNode
    centerBlock: ReactNode
    rightBlock: ReactNode
}

export const PageWrapper = ({ leftBlock, centerBlock, rightBlock }: PageWrapperProps) => {
    const headerHeight = 72

    return (
        <div className="relative flex flex-col items-center w-[100vw] h-[100vh] bg-white dark:bg-black overflow-y-auto m-[-16px]">
            <Header className={`w-full max-w-[1180px] h-[${headerHeight}px]`} />
            <div className="relative flex justify-between space-x-4 max-w-[1180px]" style={{marginTop: `${headerHeight + 16}px`}}>
                <div className="relative w-[250px] h-screen">
                    <div className={`fixed flex flex-col space-y-2`} style={{top: `${headerHeight + 14}px`}}>
                        {leftBlock}
                    </div>
                </div>
                <div className="flex-1">
                    {centerBlock}
                </div>
                <div className="relative w-[250px] h-screen">
                    <div className={`fixed flex flex-col space-y-2`} style={{top: `${headerHeight + 14}px`}}>
                        {rightBlock}
                    </div>
                </div>
            </div>
        </div>
    )
} 