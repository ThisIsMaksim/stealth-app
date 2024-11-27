import {FC, useCallback, useRef, useState} from "react";
import {Button, Input, Label, Textarea} from "keep-react";
import {ICampaign, IChangeCampaignRequest} from "../../../../types/Campaigns.type.ts";

interface Props {
  campaign: ICampaign;
  onSave: (request: IChangeCampaignRequest, action: () => void) => void
}

export const AboutCampaign = ({ campaign, onSave }: Props) => {
  const [name, setName] = useState(campaign.name)
  const [contextAboutCampaign, setContextAboutCampaign] = useState(campaign.company_context)
  const [contextAboutYou, setContextAboutYou] = useState(campaign.owner_context)
  const contextAboutCampaignMaxLength = useRef(100)
  const contextAboutYouMaxLength = useRef(100)

  const handleSave = useCallback(async () => {
    onSave({
      name,
      company_context: contextAboutCampaign,
      owner_context: contextAboutYou,
    }, () => {})
  }, [name, contextAboutCampaign, contextAboutYou])

  return <div>
    <fieldset className="max-w-md space-y-4">
      <div className="flex justify-start">
        <Label className="text-heading-6">Campaign settings</Label>
      </div>
      <div className="relative">
        <Input value={name} placeholder="Campaign name" onChange={(e) => setName(e.target.value)}/>
      </div>
    </fieldset>
    <fieldset className="flex flex-col items-start space-y-3">
      <Label className="text-heading-6" htmlFor="message">Context about your company</Label>
      <Textarea
        id="message"
        className="bg-gray-50"
        value={contextAboutCampaign}
        placeholder="Write your information about your company"
        rows={8}
        maxLength={contextAboutCampaignMaxLength.current}
        onChange={(e) => setContextAboutCampaign(e.target.value)}
      />
      <div className="w-full flex justify-end">
        <p className="text-body-4 font-normal text-metal-300">
          {`${contextAboutCampaign.length}/${contextAboutCampaignMaxLength.current}`}
        </p>
      </div>
    </fieldset>
    <fieldset className="flex flex-col items-start space-y-3">
      <Label className="text-heading-6" htmlFor="message">Context about You</Label>
      <Textarea
        id="message"
        className="bg-gray-50"
        value={contextAboutYou}
        placeholder="Write your information about You"
        rows={8}
        maxLength={contextAboutYouMaxLength.current}
        onChange={(e) => setContextAboutYou(e.target.value)}
      />
      <div className="w-full flex justify-end">
        <p className="text-body-4 font-normal text-metal-300">
          {`${contextAboutYou.length}/${contextAboutYouMaxLength.current}`}
        </p>
      </div>
    </fieldset>
    <div className="w-full flex justify-start">
      <Button onClick={handleSave}>Save</Button>
    </div>
  </div>
}