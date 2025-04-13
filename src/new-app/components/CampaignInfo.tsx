import React from 'react'
import { Card, Text } from '@gravity-ui/uikit'
import { CampaignAttributes } from './CmpaignAttributes'
import { CampaignNameAndStatus } from './CmpaignNameAndStatus'

export const CampaignInfo: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-[100vw] max-w-[650px]">
        <Card view="filled" type="container" theme="normal" className="p-6 text-start">
          <div className="flex justify-between items-center mb-4">
            <Text variant="header-1" className="text-start">Campaign info</Text>
          </div>
          <CampaignNameAndStatus />
      </Card>
      <Card view="filled" type="container" theme="normal" className="p-6 text-start">
          <div className="flex justify-between items-center mb-4">
            <Text variant="header-1" className="text-start">Campaign context</Text>
          </div>
          <div className="space-y-4">
            <CampaignAttributes
              title="What does my company do in one sentence?"
              fieldName="about_company"
              description="Yango Autonomy is a tech company, provides with autonomous delivery robots, making the last-mile delivery safer, greener and more effecient for the businesses."
            />
            <CampaignAttributes
              title="Who is my target audience?"
              fieldName='audience'
              description="We build the autonomous delivery, helping operational and marketing teams to have a reliable delivery solution with predictable cost and unique marketing opportunities utilising branded robots."
            />
            <CampaignAttributes
              title="What makes my product different from others?"
              fieldName='product_diff'
              description="Yango Autonomy has proven the autonomous technology on the real ground, our robots have been delivered more than 350000 orders so far in a different climate and weather conditions."
            />
            <CampaignAttributes
              title="What problems does my product solve?"
              fieldName='mission'
              description="We help businesses continue deliver their products with predicatble price, especially in markets facing labour shortage."
            />
            <CampaignAttributes
              title="What specific results do our customers achieve?"
              fieldName='achievement'
              description="We see 15-20% of cost-saving on order using robot delivery, especially in villa compounds where we deliver to the doorstep and there is no difference between standard and robot delivery."
            />
          </div>
      </Card>
    </div>
  );
}; 