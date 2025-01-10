import {Button, Label, Textarea} from "keep-react"
import {useCallback, useState} from "react"

interface Props {
  title: string
  defaultValue: string
  maxLength: number
  fieldName: string
  disabled: boolean
  onChange: (fieldName: string, value: string) => void
}

export const Context = ({title, defaultValue, maxLength, fieldName, disabled, onChange}: Props) => {
  const [value, setValue] = useState(defaultValue)

  const handleChange = useCallback(() => {
    onChange(fieldName, value)
  }, [onChange, fieldName, value])

  return (
    <div>
      <fieldset className="flex flex-col items-start space-y-4">
        <Label className="text-heading-6" htmlFor="message">{title}</Label>
        <Textarea
          id="message"
          className="bg-gray-50"
          value={value}
          placeholder="Write your information about your company"
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