import { Card } from '@gravity-ui/uikit'

interface EmptyComponentProps {
    title: string
}

export const EmptyComponent = ({ title }: EmptyComponentProps) => (
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