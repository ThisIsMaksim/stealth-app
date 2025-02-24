import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button, Card, Divider,
  Dropdown,
  DropdownAction,
  DropdownContent,
  DropdownItem,
  Empty,
  EmptyDescription,
  EmptyImage,
  EmptyTitle,
  Input,
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
import {ArrowSquareOut, DotsThreeOutlineVertical, Plus, Timer, Trash, User} from "phosphor-react"
import {IProspect} from "../../../types/Prospects.type"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import {useLayoutEffect, useMemo, useState} from "react"
import {ClockLoader} from "react-spinners"

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
    <Button id="add-prospects" variant="outline" className="flex gap-1.5" onClick={() => addProspect()}>
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
    {/*<TableCell className="text-start"></TableCell>*/}
    <TableCell className="w-[200px]"></TableCell>
    {/*<TableCell className="text-end"></TableCell>*/}
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
          <div>Name</div>
        </TableHead>
        <TableHead className="w-[200px]">
          <div>Post frequency</div>
        </TableHead>
        <TableHead className="w-[200px]">
          <div className="text-end">Last comment</div>
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
                <p className="text-body-5 font-normal line-clamp-2">
                  {item.position}
                </p>
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
          <TableCell className="text-end">{item.last_comment_ts ? dayjs().to(item.last_comment_ts) : '-'}</TableCell>
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

interface OpenProspectProps {
  linkUrl: string
}

export const OpenProspect = ({ linkUrl }: OpenProspectProps) => (
  <div className="absolute top-[16px] right-[58px]">
    <Button variant="softBg" shape="icon" color="secondary" onClick={() => window.open(linkUrl, '_blank')}>
      <ArrowSquareOut/>
    </Button>
  </div>
)

interface RemoveProspectProps {
  removeProspect: () => void
}

export const RemoveProspect = ({ removeProspect }: RemoveProspectProps) => (
  <div className="absolute top-[16px] right-[16px]">
    <Button variant="softBg" shape="icon" color="secondary" onClick={removeProspect}>
      <Trash />
    </Button>
  </div>
)

const MobileProspects = ({prospects, withoutSkeletons, removeProspect}: ProspectsProps) => (
  <div className="mt-2">
    <div className="space-y-3 pb-10">
      {!withoutSkeletons && prospects.length === 0 && <Skeletons />}
      {prospects.map((item) => (
        <Card key={item.id} className="relative max-w-full p-4 bg-gray-50 dark:bg-gray-800">
          <div className="text-start">
            {item.name ? (
              <div className="flex items-center gap-2 pr-[90px]">
                <Avatar>
                  <AvatarImage src={item.avatar_url}/>
                  <AvatarFallback>{item.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-body-4 font-medium overflow-hidden whitespace-nowrap" style={{textOverflow: 'ellipsis'}}>{item.name}</p>
                  <p className="text-body-5 font-normal line-clamp-2" style={{textOverflow: 'ellipsis'}}>
                    {item.position}
                  </p>
                </div>
              </div>
            ) : (
              (
                <Badge variant="border" color="primary">
                  <ClockLoader color="rgb(27, 77, 255)" size={15}/>
                  Enriching...
                </Badge>
              )
            )}
          </div>
          <Divider className="mt-4 mb-4"/>
          <div className="flex flex-row items-center gap-2">
            <div className="text-body-3 font-medium">Post frequency:</div>
            <div className="text-body-3 text-start text-metal-400">{item.post_frequency}</div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <div className="text-body-3 font-medium">Last comment:</div>
            <div className="text-body-3 text-start text-metal-400">{item.last_comment_ts ? dayjs().to(item.last_comment_ts) : '-'}</div>
          </div>
          <RemoveProspect removeProspect={() => removeProspect(item.id)} />
          <OpenProspect linkUrl={item.link_url} />
        </Card>
      ))}
    </div>
  </div>
)

export const Audience = (props: Props) => {
  const {prospects, status, addProspect} = props
  const isEmpty = useMemo(() => status === 'done' && prospects.length === 0, [prospects, status])
  const [filterByName, setFilterByName] = useState('all')
  const [filterPostFrequency, setFilterPostFrequency] = useState('all')
  const [enteredName, setEnteredName] = useState('')
  const [isMobile, setMobile] = useState(false)

  const names = useMemo(() => {
    return [...new Set(prospects.filter(c => !!c.name).map(c => c.name))]
  }, [prospects])

  const filteredProspects = useMemo(() => {
    const byIds = new Map()

    prospects.forEach((prospect) => {
      byIds.set(prospect.id, prospect)
    })

    const items = [...byIds.values()]

    const byName = filterByName === 'all' ? items : items.filter((prospect) => prospect.name === filterByName)

    return filterPostFrequency === 'all' ? byName : byName.filter((prospect) => {
      if (filterPostFrequency === 'inactive') {
        return prospect.post_frequency === 'inactive'
      }
      if (filterPostFrequency === 'more than once per week') {
        if (prospect.post_frequency.toLowerCase().includes('times per week')) {
          const items = prospect.post_frequency.split(' ')

          return +items[0] > 1
        }
      }
      if (filterPostFrequency === 'more than once per month') {
        if (prospect.post_frequency.toLowerCase().includes('times per month') || prospect.post_frequency.toLowerCase().includes('times per week')) {
          const items = prospect.post_frequency.split(' ')

          return +items[0] > 1
        }
      }
    })
  }, [filterByName, filterPostFrequency, prospects])

  useLayoutEffect(() => {
    setMobile(window.innerWidth < 768)

    window.addEventListener('resize', () => setMobile(window.innerWidth < 768))
  }, [])

  const Header = !isEmpty ? (
    <div className="flex items-center justify-between pt-4 pb-1">
      <div className="flex items-center gap-2">
        <h2 className="text-heading-6 font-semibold text-metal-900 dark:text-white">Total prospects</h2>
        <Badge className="dark:bg-metal-800 dark:text-white">
          {prospects.length}
        </Badge>
      </div>
      <div className="flex items-center gap-5">
        <Button id="add-prospects" variant="outline" className="flex gap-1.5" onClick={() => addProspect()}>
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
        value={filterPostFrequency === 'all' ? '' : filterPostFrequency}
        onValueChange={setFilterPostFrequency}
      >
        <SelectAction id="post-frequency" className="w-[20rem]">
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
            <SelectItem value="more than once per month">more than once per month</SelectItem>
            <SelectItem value="inactive">inactive</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ) : null

  if (isEmpty) return <EmptyComponent {...props} />

  const Content = isMobile ? MobileProspects : Prospects

  return (
    <div>
      {Header}
      {Filters}
      <Content
        prospects={filteredProspects}
        withoutSkeletons={prospects.length > 0}
        removeProspect={props.removeProspect}
      />
    </div>
  )
}