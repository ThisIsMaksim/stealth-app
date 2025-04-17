import logo from "../assets/logo.png"

export const Logo = () => (
  <div id="logo" className="flex flex-row items-center gap-1">
    <img
        className="flex-shrink-0 w-[32px] rounded-lg"
        src={logo}
        alt="logo"
      />
    <div className="text-heading-5">Elvyn.ai</div>
  </div>
)