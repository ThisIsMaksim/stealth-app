import {FC, useRef, useState} from "react";
import {Label, Textarea} from "keep-react";

export const Insights: FC = () => {
  const [value, setValue] = useState('')
  const maxLength = useRef(100)

  return <fieldset className="flex flex-col items-start space-y-3 p-2">
    <Label className="text-heading-6" htmlFor="message">Insights that you want to highlight in your campaign</Label>
    <Textarea
      id="message"
      className="bg-gray-50"
      placeholder=""
      rows={8}
      maxLength={maxLength.current}
      onChange={(e) => setValue(e.target.value)}
    />
    <div className="w-full flex justify-end">
      <p className="text-body-4 font-normal text-metal-300">{`${value.length}/${maxLength.current}`}</p>
    </div>
  </fieldset>
}