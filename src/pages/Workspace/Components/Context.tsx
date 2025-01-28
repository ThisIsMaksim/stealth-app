import {
  Button,
  Label,
  Popover,
  PopoverAction,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  Textarea
} from "keep-react"
import {useCallback, useState} from "react"

interface Props {
  title: string
  description: string
  defaultValue: string
  maxLength: number
  fieldName: string
  disabled: boolean
  onChange: (fieldName: string, value: string) => void
}

export const Context = ({title, description, defaultValue, maxLength, fieldName, disabled, onChange}: Props) => {
  const [value, setValue] = useState(defaultValue)

  const handleChange = useCallback(() => {
    onChange(fieldName, value)
  }, [onChange, fieldName, value])

  return (
    <div>
      <fieldset className="flex flex-col items-start space-y-4">
        <div className="flex flex-row justify-between gap-2 w-[100%]">
          <Label className="text-heading-6 text-start" htmlFor="message">{title}</Label>
          <Popover>
            <PopoverAction asChild>
              <Button className="p-1 lowercase" variant="link">show example</Button>
            </PopoverAction>
            <PopoverContent className="flex items-center gap-3 bg-white p-5 border border-metal-100 dark:border-metal-800 dark:bg-gray-900">
              <div className="space-y-2 pt-4">
                <PopoverTitle className="text-body-2 font-semibold">{title}</PopoverTitle>
                <PopoverDescription>
                  {description}
                </PopoverDescription>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Textarea
          id="message"
          className="bg-gray-50 h-[150px]"
          value={value}
          rows={8}
          maxLength={maxLength}
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="w-full flex justify-end">
          <p className="text-body-4 font-normal text-metal-300">
            {`${value.length}/${maxLength}`}
          </p>
        </div>
      </fieldset>
      <div className="w-full flex justify-start">
        <Button disabled={disabled} onClick={handleChange}>Save</Button>
      </div>
    </div>
  )
}