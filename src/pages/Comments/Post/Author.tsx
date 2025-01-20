import {Avatar, AvatarFallback, AvatarImage} from "keep-react"
import {IAuthor} from "../../../types/Post.type.ts"

interface Props {
  author: IAuthor
}

export const Author = ({ author }: Props) => {
  return (
    <div className="flex flex-row gap-2">
      <Avatar>
        <AvatarImage src={author.avatar_url}/>
        <AvatarFallback>{author.name.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-start text-gray-900 dark:text-gray-50">{author.name}</p>
        <p className="text-start text-gray-500 dark:text-gray-200 text-body-4">{author.position}</p>
      </div>
    </div>
  )
}