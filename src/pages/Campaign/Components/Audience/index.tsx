import {
  Avatar,
  AvatarFallback, AvatarImage,
  Badge,
  Button, Dropdown, DropdownAction, DropdownContent,
  DropdownItem, Empty, EmptyDescription, EmptyImage, EmptyTitle, Skeleton, SkeletonLine, Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "keep-react";
import {DotsThreeOutlineVertical, Plus} from "phosphor-react"
import {IProspect} from "../../../../types/Prospects.type.ts"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import './index.css'
import {useMemo} from "react"

dayjs.extend(relativeTime)

interface Props {
  status: string
  prospects: IProspect[]
  addProspect: () => void
  removeProspect: (prospectId: string) => void
}

const EmptyComponent = ({addProspect}: Props) => (
  <Empty>
    <EmptyImage>
      <img
        src="https://staticmania.cdn.prismic.io/staticmania/16994ca5-ac01-4868-8ade-1b9e276ccdb3_Property+1%3DFolder_+Property+2%3DLg.svg"
        className="pt-4"
        height={234}
        width={350}
        alt="404"
      />
    </EmptyImage>
    <EmptyTitle className="mb-[14px] mt-5">You don't have any prospects yet</EmptyTitle>
    <EmptyDescription className="mb-8">
      Add the prospects to your campaign to start using them
    </EmptyDescription>
    <Button variant="outline" className="flex gap-1.5" onClick={() => addProspect()}>
      <Plus className="size-4 fill-metal-900 dark:fill-white"/>
      Add prospect
    </Button>
  </Empty>
)

const Skeletons = () => Array.from({ length: 3 }).map((_) => (
  <TableRow>
    <TableCell className="text-start">
      <Skeleton className="flex max-w-md items-center gap-3">
        <SkeletonLine className="h-12 w-12 rounded-full"/>
        <div className="space-y-2">
          <SkeletonLine className="h-4 w-[200px]" />
          <SkeletonLine className="h-4 w-[200px]" />
        </div>
      </Skeleton>
    </TableCell>
    <TableCell className="text-start"></TableCell>
    <TableCell className="text-end"></TableCell>
    <TableCell className="text-end"></TableCell>
    <TableCell className="text-end"></TableCell>
    <TableCell>
    </TableCell>
  </TableRow>
))

const Prospects = ({prospects, removeProspect}: Props) => (
  <Table className="mt-4">
    <TableHeader>
      <TableRow>
        <TableHead>
          <div className="w-[200px]">Name</div>
        </TableHead>
        <TableHead>
          <div className="">Post frequency</div>
        </TableHead>
        <TableHead>
          <div className="text-end"># of comments</div>
        </TableHead>
        <TableHead>
          <div className="text-end w-[100px]">Last comment</div>
        </TableHead>
        <TableHead>
          <div className="text-end w-[100px]">Last check</div>
        </TableHead>
        <TableHead></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody className="pb-10">
      {prospects.length === 0 && <Skeletons />}
      {prospects.map((item) => (
        <TableRow key={item.id}>
          <TableCell className="text-start">
            {item.name && <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={item.avatar_url}/>
                <AvatarFallback>{item.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-body-4 font-medium">{item.name}</p>
                <p className="Position text-body-5 font-normal">{item.position}</p>
              </div>
            </div>}
            {!item.name && (
              <Badge variant="border" color="primary">
                <Spinner />
                Enriching...
              </Badge>
            )}
          </TableCell>
          <TableCell className="text-start">{item.post_frequency}</TableCell>
          <TableCell className="text-end">{item.comments_count}</TableCell>
          <TableCell className="text-end">{item.last_comment_ts ? dayjs().to(item.last_comment_ts) : '-'}</TableCell>
          <TableCell className="text-end">{item.last_check_ts ? dayjs().to(item.last_check_ts) : '-'}</TableCell>
          <TableCell>
            <Dropdown>
              <DropdownAction asChild>
                <button>
                  <DotsThreeOutlineVertical className="size-4 fill-metal-900 dark:fill-white"/>
                </button>
              </DropdownAction>
              <DropdownContent align="end" className="w-[200px] border border-metal-100 p-3 dark:border-metal-800">
                <DropdownItem onClick={() => removeProspect(item.id)}>Delete</DropdownItem>
              </DropdownContent>
            </Dropdown>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

export const Audience = (props: Props) => {
  const {prospects, status, addProspect} = props
  const isEmpty = useMemo(() => status === 'done' && prospects.length === 0, [prospects, status])

  const Header = !isEmpty ? (
    <div className="flex items-center justify-between pt-4 pb-4">
      <div className="flex items-center gap-5">
        <h2 className="text-heading-6 font-semibold text-metal-900 dark:text-white">Total prospects</h2>
        <Badge className="dark:bg-metal-800 dark:text-white">
          {prospects.length}
        </Badge>
      </div>
      <div className="flex items-center gap-5">
        <Button variant="outline" className="flex gap-1.5" onClick={() => addProspect()}>
          <Plus className="size-4 fill-metal-900 dark:fill-white"/>
          Add prospect
        </Button>
        {/*<Button variant="outline" className="flex gap-1.5">*/}
        {/*  <Funnel className="size-4 fill-metal-900 dark:fill-white"/>*/}
        {/*  Filter prospects*/}
        {/*</Button>*/}
      </div>
    </div>
  ) : null

  if (isEmpty) return <EmptyComponent {...props} />

  return (
    <div>
      {Header}
      <Prospects {...props} />
    </div>
  )
}