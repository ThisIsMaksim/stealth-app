import {
  Navbar,
  NavbarContainer,
  NavbarList,
} from 'keep-react'
import {ThemeSwitcher} from "../ThemeSwitcher"
import './index.css'

export const Header = () => {
  return (
    <Navbar>
      <NavbarContainer className="Header">
        <NavbarList>
          {/*<CampaignSwitcher />*/}
        </NavbarList>
        <NavbarList>
          <ThemeSwitcher />
        </NavbarList>
      </NavbarContainer>
    </Navbar>
  )
}

