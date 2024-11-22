import {Header, Menu} from "../../components"
import './index.css'
import {Card} from "keep-react";

export function AuthPageWrapper({children}) {
  return (
    <div className="AuthPageApp h-full h-max-full">
      <Menu />
      <div className="AuthPageWrapper h-full h-max-full">
        <Header />
          <Card className="Route w-full max-w-full p-4 mt-4 overflow-auto">
            {children}
          </Card>
      </div>
    </div>
  )
}