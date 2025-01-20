import {Card, CardContent, CardDescription, CardTitle} from "keep-react"
import {Lightning} from "phosphor-react"

interface Props {
  summary: string
}

export const Summary = ({ summary }: Props) => (
  <Card className="w-full max-w-full text-start">
    <CardContent className="max-md:p-4 p-4 bg-blue-300">
      <CardTitle className="flex flex-row items-center dark:text-blue-900">
        <Lightning size={24} />
        Short summary or opinion
      </CardTitle>
      <CardDescription className="dark:text-blue-900">
        {summary}
      </CardDescription>
    </CardContent>
  </Card>
)