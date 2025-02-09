import {Button, Card, CardContent, CardTitle, Input} from "keep-react";
import {CheckCircle, XCircle} from "phosphor-react";

const FEATURES: Record<string, boolean> = {
  '300 prospects': true,
  'Custom feed with prospects only': true,
  'Filters by relevancy and frequency': true,
  'Unlimited campaigns': true,
  'Smart regeneration': true,
}

const BASIC_FEATURES: Record<string, boolean> = {
  ...FEATURES,
}

export const Subscriptions = () => (
  <div className="relative flex max-md:flex-col items-center justify-end m-auto w-full h-full gap-4">
    <div className="w-full max-w-[768px] h-full max-md:text-center text-right">
      <CardContent className="flex flex-col items-center justify-center w-full h-full">
        <div className="w-full text-heading-2 font-semibold max-md:text-center text-right">ELVYN.ai</div>
        <div className="text-heading-4">
          Win deals before they start by joining every conversation your customers have on LinkedIn
        </div>
      </CardContent>
    </div>
    <Card className="flex flex-col items-center justify-center w-full max-w-[450px] h-full">
      <CardTitle>
        <div className="text-heading-6 font-bold text-white">Basic</div>
        <div className="text-heading-4 font-bold text-white">
          <span className="text-gray-900 dark:text-white">49$</span>
          <span className="ml-1 text-red-400 line-through">80$</span>
        </div>
      </CardTitle>
      <form action="/api/v1/purchases/session" method="POST" className="w-full max-w-[400px] pr-4 pl-4 mt-4">
        <Input type="hidden" name="subscription_id" value="c15363c2-fb5e-47a6-a5a6-55a662a37903"/>
        <Button color="secondary" size="xl" type="submit" className="w-full">
          Get started
        </Button>
      </form>
      <CardContent className="space-y-3 text-start">
        <div className="font-bold">What's include</div>
        {Object.keys(BASIC_FEATURES).map(key => (
          <div className="flex flex-row gap-1">
            {BASIC_FEATURES[key]
              ? <CheckCircle size={24} className="text-green-400"/>
              : <XCircle size={24} className="text-red-400"/>}
            {key}
          </div>
        ))}
      </CardContent>
    </Card>
  </div>
)