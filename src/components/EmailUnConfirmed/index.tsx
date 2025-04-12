import {Button, Empty, EmptyDescription, EmptyImage, EmptyTitle} from "keep-react"

interface EmailUnConfirmedProps {
  height: string
  email: string
}

export const EmailUnConfirmed = ({height, email}: EmailUnConfirmedProps) => (
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
      <EmptyTitle className="mb-[14px] mt-5">You need to confirm your email address</EmptyTitle>
      <EmptyDescription className="mb-8">
        {`We have sent you a confirmation email link to ${email}`}
      </EmptyDescription>
      <Button variant="outline" className="flex gap-1.5">
        Resend
      </Button>
    </Empty>
  </div>
) 