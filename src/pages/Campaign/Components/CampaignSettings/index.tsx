import {FC} from "react";
import {Button, Input, Label} from "keep-react";

export const CampaignSettings: FC = () => {
  return <fieldset className="max-w-md space-y-4">
    <div className="flex justify-start">
      <Label className="text-heading-6">Campaign settings</Label>
    </div>
    <div className="relative">
      <Input placeholder="Campaign name"/>
    </div>
    {/*<div className="relative">*/}
    {/*  <Input placeholder="Fetch not older than (days)"/>*/}
    {/*</div>*/}
    <div className="w-full flex justify-start">
      <Button>Save</Button>
    </div>
  </fieldset>
}