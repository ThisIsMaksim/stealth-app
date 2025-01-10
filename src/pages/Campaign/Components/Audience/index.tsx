import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Dropdown,
  DropdownAction,
  DropdownContent,
  DropdownItem,
  Empty,
  EmptyDescription,
  EmptyImage,
  EmptyTitle, Input,
  Select,
  SelectAction,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
  Skeleton,
  SkeletonLine,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  TooltipAction,
  TooltipContent,
  TooltipProvider
} from "keep-react";
import {Chat, DotsThreeOutlineVertical, Plus, Timer, User} from "phosphor-react"
import {IProspect} from "../../../../types/Prospects.type.ts"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import './index.css'
import {useMemo, useState} from "react"
import {ClockLoader} from "react-spinners";

dayjs.extend(relativeTime)

interface Props {
  status: string
  prospects: IProspect[]
  addProspect: () => void
  removeProspect: (prospectId: string) => void
}

interface EmptyComponentProps {
  status: string
  prospects: IProspect[]
  addProspect: () => void
  removeProspect: (prospectId: string) => void
}

interface ProspectsProps {
  prospects: IProspect[]
  withoutSkeletons: boolean
  removeProspect: (prospectId: string) => void
}

const EmptyComponent = ({addProspect}: EmptyComponentProps) => (
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

const Skeletons = () => Array.from({ length: 3 }).map(() => (
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

const Prospects = ({prospects, withoutSkeletons, removeProspect}: ProspectsProps) => (
  <Table className="mt-2">
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
    <TableBody className="pb-10 bg-gray-50 dark:bg-gray-800">
      {!withoutSkeletons && prospects.length === 0 && <Skeletons />}
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
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipAction asChild>
                    <Badge variant="border" color="primary">
                      <ClockLoader color="rgb(27, 77, 255)" size={15} />
                      Enriching...
                    </Badge>
                  </TooltipAction>
                  <TooltipContent>
                    <p className="text-body-5 font-medium text-white lowercase">
                      Prospect is in the process of enrichment,
                    </p>
                    <p className="text-body-5 font-medium text-white lowercase">
                      it usually takes some time.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </TableCell>
          <TableCell className="text-start">{item.post_frequency}</TableCell>
          <TableCell className="text-end">{item.comments_count}</TableCell>
          <TableCell className="text-end">{item.last_comment_ts ? dayjs().to(item.last_comment_ts) : '-'}</TableCell>
          <TableCell className="text-end">{item.last_post_check_ts ? dayjs().to(item.last_post_check_ts) : '-'}</TableCell>
          <TableCell>
            <Dropdown>
              <DropdownAction asChild>
                <button>
                  <DotsThreeOutlineVertical className="size-4 fill-metal-900 dark:fill-white"/>
                </button>
              </DropdownAction>
              <DropdownContent align="end" className="w-[200px] border border-metal-100 p-3 dark:border-metal-800">
                <DropdownItem onClick={() => window.open(item.link_url, '_blank')}>Open in LinkedIn</DropdownItem>
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
  const [filterByName, setFilterByName] = useState('all')
  const [filterCommentsCount, setFilterCommentsCount] = useState('all')
  const [filterPostFrequency, setFilterPostFrequency] = useState('all')
  const [enteredName, setEnteredName] = useState('')

  const names = useMemo(() => {
    return [...new Set(prospects.map(c => c.name))]
  }, [prospects, enteredName])

  const filteredProspects = useMemo(() => {
    const byIds = new Map()

    prospects.forEach((prospect) => {
      byIds.set(prospect.id, prospect)
    })

    const items = [...byIds.values()]

    const byName = filterByName === 'all' ? items : items.filter((prospect) => prospect.name === filterByName)
    const byCommentsCount = filterCommentsCount === 'all' ? byName : items.filter((prospect) => prospect.comments_count > +filterCommentsCount)
    const byPostFrequency = filterPostFrequency === 'all' ? byCommentsCount : byCommentsCount.filter((prospect) => prospect.post_frequency === filterPostFrequency)

    const result = byPostFrequency

    return result
  }, [filterByName, filterCommentsCount, filterPostFrequency, prospects])

  const Header = !isEmpty ? (
    <div className="flex items-center justify-between pt-4 pb-4">
      <div className="flex items-center gap-5">
        <h2 className="text-heading-6 font-semibold text-metal-900 dark:text-white">Total prospects</h2>
        <Badge className="dark:bg-metal-800 dark:text-white">
          {prospects.length}
        </Badge>
      </div>
      <div className="flex items-center gap-5">
        <Button variant="outline" id="add-prospect" className="flex gap-1.5" onClick={() => addProspect()}>
          <Plus className="size-4 fill-metal-900 dark:fill-white"/>
          Add prospect
        </Button>
      </div>
    </div>
  ) : null
  const Filters = !isEmpty ? (
    <div className="hidden lg:flex flex-row items-center gap-2 pt-4 pb-4">
      <Select
        value={filterByName === 'all' ? '' : filterByName}
        onValueChange={setFilterByName}
      >
        <SelectAction className="w-[20rem]">
          <div className="flex items-center gap-2.5">
              <span>
                <User className="h-4 w-4" />
              </span>
            <SelectValue
              placeholder="Prospect name"
            />
          </div>
        </SelectAction>
        <SelectContent className="border border-metal-100 dark:border-metal-800 dark:bg-gray-900">
          <Input
            placeholder="Enter name"
            type="text"
            autoFocus
            onChange={(e) => setEnteredName(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()}
          />
          <SelectGroup className="mt-2">
            {!enteredName && <SelectItem value="all">All</SelectItem>}
            {names
              .filter((name) => name.toLowerCase().startsWith(enteredName.toLowerCase()))
              .map((name) => (
              <SelectItem key={name} value={name}>{name}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        value={filterCommentsCount === 'all' ? '' : filterCommentsCount}
        onValueChange={setFilterCommentsCount}
      >
        <SelectAction className="w-[20rem]">
          <div className="flex items-center gap-2.5">
              <span>
                <Chat className="h-4 w-4" />
              </span>
            <SelectValue
              placeholder="Comments count"
            />
          </div>
        </SelectAction>
        <SelectContent className="border border-metal-100 dark:border-metal-800 dark:bg-gray-900">
          <SelectGroup>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="1">More 1</SelectItem>
            <SelectItem value="5">More 5</SelectItem>
            <SelectItem value="10">More 10</SelectItem>
            <SelectItem value="15">More 15</SelectItem>
            <SelectItem value="30">More 30</SelectItem>
            <SelectItem value="50">More 50</SelectItem>
            <SelectItem value="100">More 100</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        value={filterPostFrequency === 'all' ? '' : filterPostFrequency}
        onValueChange={setFilterPostFrequency}
      >
        <SelectAction className="w-[20rem]">
          <div className="flex items-center gap-2.5">
              <span>
                <Timer className="h-4 w-4" />
              </span>
            <SelectValue
              placeholder="Post frequency"
            />
          </div>
        </SelectAction>
        <SelectContent className="border border-metal-100 dark:border-metal-800 dark:bg-gray-900">
          <SelectGroup>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="more than once per week">more than once per week</SelectItem>
            <SelectItem value="less than once per week">less than once per week</SelectItem>
            <SelectItem value="less than once per 2 weeks">less than once per 2 weeks</SelectItem>
            <SelectItem value="less than once per month">less than once per month</SelectItem>
            <SelectItem value="less than once per 2 months">less than once per 2 months</SelectItem>
            <SelectItem value="inactive">inactive</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ) : null

  if (isEmpty) return <EmptyComponent {...props} />

  return (
    <div>
      {Header}
      {Filters}
      <Prospects
        prospects={filteredProspects}
        withoutSkeletons={prospects.length > 0}
        removeProspect={props.removeProspect}
      />
    </div>
  )
}