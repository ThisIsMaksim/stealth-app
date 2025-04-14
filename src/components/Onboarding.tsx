import {ReactNode} from "react"
import {observer} from "mobx-react"
import {TourProvider} from "@reactour/tour"
import {useTheme} from "../ThemeProvider.tsx"
import { Button } from "@gravity-ui/uikit"

interface Props {
  children: ReactNode
}

export const Onboarding = observer((props: Props) => {
  const radius = 10
  const steps = []
  const {theme} = useTheme()
  const isDark = theme === 'dark'

  return (
    <TourProvider
      steps={steps}
      styles={{
        popover: (base) => ({
          ...base,
          '--reactour-accent': isDark ? 'rgb(249, 250, 251)' : 'rgb(31, 41, 55)',
          borderRadius: radius,
        }),
        maskArea: (base) => ({ ...base, rx: radius }),
        maskWrapper: (base) => ({ ...base, color: isDark ? 'rgb(249, 250, 251)' : 'rgb(31, 41, 55)' }),
        controls: (base) => ({ ...base, justifyContent: 'flex-end', gap: '8px' }),
        close: (base) => ({ ...base, right: 'auto', left: 8, top: 8 }),
      }}
      showCloseButton={false}
      showDots={false}
      showBadge={false}
      prevButton={({ currentStep, setCurrentStep, steps }) => {
        const first = currentStep === 0

        if (first) return <Button disabled variant="link" className="text-transparent">Back</Button>

        return (
          <Button
            view="outlined-danger"
            onClick={() => setCurrentStep((s) => first ? steps.length - 1 : s - 1)}
          >
            Back
          </Button>
        )
      }}
      nextButton={({ currentStep, setCurrentStep, stepsLength, setIsOpen, steps }) => {
        const last = currentStep === stepsLength - 1

        return (
          <Button
            view="action"
            onClick={() => last ? setIsOpen(false) : setCurrentStep((s) => (s === steps?.length - 1 ? 0 : s + 1))}
          >
            {last ? 'Close' : 'Next'}
          </Button>
        )
      }}
      onClickMask={() => {}}
    >
      {props.children}
    </TourProvider>
  )
})