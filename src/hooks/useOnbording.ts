import {StepType, useTour} from "@reactour/tour"
import {useCallback} from "react"

export const useOnbording = () => {
  const {setIsOpen, setSteps} = useTour()

  return useCallback((id: string, steps: StepType[]) => {
    if (!localStorage.getItem(`onboarding-${id}`)) {
      setSteps(steps)
      setIsOpen(true)
    }

    localStorage.setItem(`onboarding-${id}`, 'true')
  }, [])
}