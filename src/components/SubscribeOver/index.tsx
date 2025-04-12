import {Button, Empty, EmptyDescription, EmptyImage, EmptyTitle} from "keep-react"

interface SubscribeOverProps {
  height: string
}

export const SubscribeOver = ({height}: SubscribeOverProps) => (
  <div className="flex items-center justify-center w-[100vw]" style={{height}}>
    <Empty>
      <EmptyImage>
        <img
          src="https://staticmania.cdn.prismic.io/staticmania/7c82d76e-be06-41ca-a6ef-3db9009e6231_Property+1%3DFolder_+Property+2%3DSm.svg"
          className="pt-4"
          height={234}
          width={350}
          alt="404"
        />
      </EmptyImage>
      <EmptyTitle className="mb-[14px] mt-5">Your subscription is over</EmptyTitle>
      <EmptyDescription className="mb-8">
        To continue using the service, extend it
      </EmptyDescription>
      <Button variant="outline" className="flex gap-1.5" onClick={() => window.location.href = '/payment'}>
        Resubscribe
      </Button>
    </Empty>
  </div>
) 