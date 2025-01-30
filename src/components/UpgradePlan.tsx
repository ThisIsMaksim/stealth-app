import {Link} from "react-router-dom"
import {Button} from "keep-react"
import {ComponentProps} from "../types/Component"
import {Crown} from "phosphor-react"
import {observer} from "mobx-react"
import {useStores} from "../stores"

export const UpgradePlan = observer(({ className }: ComponentProps) => {
  const { FirebaseStore } = useStores()

  if (!FirebaseStore.config['stripe']) return null

  return (
    <Button className={className}>
      <Link to="/payment" className="flex flex-row items-center gap-1">
        <Crown size={24} /> Upgrade plan
      </Link>
    </Button>
  )
})