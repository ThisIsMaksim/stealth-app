import {Card, Label, NavbarBrand} from "keep-react"
import logo from "../assets/logo.png"

export const Logo = () => (
  <NavbarBrand className="flex flex-row items-center gap-1">
    <Card>
      <img
        className="flex-shrink-0 w-[32px] h-[32px]"
        src={logo}
        alt="logo"
      />
    </Card>
    <Label className="text-heading-5">ELVYN.ai</Label>
  </NavbarBrand>
)