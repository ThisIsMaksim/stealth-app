import {
  Avatar,
  AvatarFallback, AvatarImage,
  Badge,
  Button, Checkbox, Dropdown, DropdownAction, DropdownContent,
  DropdownItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "keep-react";
import {DotsThreeOutlineVertical, Funnel, Plus} from "phosphor-react";

interface IProspect {
  id: string
  name: string
  avatar: string
  job_position: string
  post_frequency: string
  comments: number
  last_comment: number
  last_check: number
}

const prospects: IProspect[] = [
  {
    id: '0',
    name: 'Enzo Farnandez',
    avatar: 'https://react.keepdesign.io/images/avatar/avatar-1.png',
    job_position: 'Co-Founder',
    post_frequency: '3 times per month',
    comments: 10,
    last_comment: Date.now(),
    last_check: Date.now()
  },
  {
    id: '0',
    name: 'Enzo Farnandez',
    avatar: 'https://react.keepdesign.io/images/avatar/avatar-1.png',
    job_position: 'Co-Founder',
    post_frequency: '3 times per month',
    comments: 10,
    last_comment: Date.now(),
    last_check: Date.now()
  },
  {
    id: '0',
    name: 'Enzo Farnandez',
    avatar: 'https://react.keepdesign.io/images/avatar/avatar-1.png',
    job_position: 'Co-Founder',
    post_frequency: '3 times per month',
    comments: 10,
    last_comment: Date.now(),
    last_check: Date.now()
  },
  {
    id: '0',
    name: 'Enzo Farnandez',
    avatar: 'https://react.keepdesign.io/images/avatar/avatar-1.png',
    job_position: 'Co-Founder',
    post_frequency: '3 times per month',
    comments: 10,
    last_comment: Date.now(),
    last_check: Date.now()
  },
  {
    id: '0',
    name: 'Enzo Farnandez',
    avatar: 'https://react.keepdesign.io/images/avatar/avatar-1.png',
    job_position: 'Co-Founder',
    post_frequency: '3 times per month',
    comments: 10,
    last_comment: Date.now(),
    last_check: Date.now()
  },
  {
    id: '0',
    name: 'Enzo Farnandez',
    avatar: 'https://react.keepdesign.io/images/avatar/avatar-1.png',
    job_position: 'Co-Founder',
    post_frequency: '3 times per month',
    comments: 10,
    last_comment: Date.now(),
    last_check: Date.now()
  }
]

export const Audience = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <h2 className="text-heading-6 font-semibold text-metal-900 dark:text-white">Total prospects</h2>
          <Badge className="dark:bg-metal-800 dark:text-white">
            {prospects.length}
          </Badge>
        </div>
        <div className="flex items-center gap-5">
          <Button variant="outline" className="flex gap-1.5">
            <Plus className="size-4 fill-metal-900 dark:fill-white"/>
            Add prospect
          </Button>
          <Button variant="outline" className="flex gap-1.5">
            <Funnel className="size-4 fill-metal-900 dark:fill-white"/>
            Filter prospects
          </Button>
        </div>
      </div>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>
            </TableHead>
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
              <div className="text-end">Last comment</div>
            </TableHead>
            <TableHead>
              <div className="text-end">Last check</div>
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prospects.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox/>
              </TableCell>
              <TableCell className="text-start">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={item.avatar}/>
                    <AvatarFallback>KR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-body-4 font-medium">{item.name}</p>
                    <p className="text-body-5 font-normal">{item.job_position}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-start">{item.post_frequency}</TableCell>
              <TableCell className="text-end">{item.comments}</TableCell>
              <TableCell className="text-end">{item.last_comment}</TableCell>
              <TableCell className="text-end">{item.last_check}</TableCell>
              <TableCell>
                <Dropdown>
                  <DropdownAction asChild>
                    <button>
                      <DotsThreeOutlineVertical className="size-4 fill-metal-900 dark:fill-white"/>
                    </button>
                  </DropdownAction>
                  <DropdownContent align="end" className="w-[200px] border border-metal-100 p-3 dark:border-metal-800">
                    <DropdownItem>Edit</DropdownItem>
                    <DropdownItem>Delete</DropdownItem>
                  </DropdownContent>
                </Dropdown>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}