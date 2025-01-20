import {
  Navbar,
  NavbarContainer,
  NavbarItem,
} from 'keep-react'
import {observer} from "mobx-react"
import {Link, useLocation} from "react-router-dom"
import {Chats, PresentationChart, User} from "phosphor-react"

export const NavBar = observer(() => {
  const location = useLocation()

  return (
    <Navbar className="w-full lg:hidden mt-[8px]">
      <NavbarContainer className="flex flex-row justify-around h-[32px]">
        {/*<Link to="/">*/}
        {/*  <NavbarItem className="flex flex-col justify-center items-center" active={location.pathname === '/'}>*/}
        {/*    <HouseLine size={24}/>*/}
        {/*    Dashboard*/}
        {/*  </NavbarItem>*/}
        {/*</Link>*/}
        <Link to="/">
          <NavbarItem className="flex flex-col justify-center items-center" active={location.pathname === '/'}>
            <PresentationChart size={24}/>
            Workspace
          </NavbarItem>
        </Link>
        <Link to="/comments">
          <NavbarItem className="flex flex-col justify-center items-center" active={location.pathname === '/comments'}>
            <Chats size={24}/>
            Comments
          </NavbarItem>
        </Link>
        <Link to="/profile">
          <NavbarItem className="flex flex-col justify-center items-center" active={location.pathname === '/profile'}>
            <User size={24}/>
            Profile
          </NavbarItem>
        </Link>
      </NavbarContainer>
    </Navbar>
  )
})

