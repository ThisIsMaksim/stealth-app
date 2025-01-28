import {Button, Card, CardContent, CardHeader, CardTitle, Input} from "keep-react"
import {CheckCircle, XCircle} from "phosphor-react"

const FEATURES: Record<string, boolean> = {
  '300 prospects': true,
  'Custom feed with prospects only': true,
  'Filters by relevancy and frequency': true,
  'Unlimited campaigns': true,
  'Smart regeneration': true,
}

const BASIC_FEATURES: Record<string, boolean> = {
  ...FEATURES,
  'Unlimited campaigns': false,
  'Smart regeneration': false,
}

const PREMIUM_FEATURES: Record<string, boolean> = {
  ...FEATURES,
  'Smart regeneration': false,
}

const ENTERPRISE_FEATURES: Record<string, boolean> = {
  ...FEATURES,
}

interface Props {
  isPrimaryColor?: boolean
}

export const StripeProducts = ({ isPrimaryColor }: Props) => (
  <div className="flex flex-col w-full justify-center space-y-3">
    <div className={`text-4xl font-bold max-md:mb-2 mb-10 text-center ${isPrimaryColor ? 'text-primary-600' : ''}`}>Choose your plan</div>
    <div className="flex flex-row max-md:flex-col justify-center gap-6 w-full">
      <Card className="max-md:max-w-full text-white">
        <div className="w-full h-full bg-primary-600">
          <CardHeader className="pt-2 pb-2">
            <CardTitle>
              <div className="text-heading-6 font-bold text-white">Basic</div>
              <div className="text-heading-4 font-bold text-white">
                <span>49$</span>
                <span className="ml-1 text-red-400 line-through">80$</span>
              </div>
            </CardTitle>
          </CardHeader>
          <form action="/create-checkout-session" method="POST" className="pr-4 pl-4 mt-4">
            <Input type="hidden" name="lookup_key" value="{{PRICE_LOOKUP_KEY}}"/>
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
        </div>
      </Card>
      <Card className="max-md:max-w-full lg:scale-110 text-white">
        <div className={`w-full h-full bg-emerald-500`}>
          <CardHeader className="pt-2 pb-2">
            <CardTitle>
              <div className="text-heading-6 font-bold text-white">Premium</div>
              <div className="text-heading-4 font-bold text-white">
                <span>99$</span>
                <span className="ml-1 text-red-400 line-through">120$</span>
              </div>
            </CardTitle>
          </CardHeader>
          <form action="/create-checkout-session" method="POST" className="pr-4 pl-4 mt-4 mb-4">
            <Input type="hidden" name="lookup_key" value="{{PRICE_LOOKUP_KEY}}"/>
            <Button color="secondary" size="xl" type="submit" className="w-full">
              Get started
            </Button>
          </form>
          <CardContent className="space-y-3 text-start dark:text-black">
            <div className="font-bold">What's include</div>
            {Object.keys(PREMIUM_FEATURES).map(key => (
              <div className="flex flex-row gap-1">
                {PREMIUM_FEATURES[key]
                  ? <CheckCircle size={24} className="dark:text-black"/>
                  : <XCircle size={24} className="text-red-400"/>}
                {key}
              </div>
            ))}
          </CardContent>
        </div>
      </Card>
      <Card className="max-md:max-w-full text-white">
        <div className={`w-full h-full bg-primary-600`}>
          <CardHeader className="pt-2 pb-2">
            <CardTitle>
              <div className="text-heading-6 font-bold text-white">Enterprise</div>
              <div className="text-heading-4 font-bold text-white">
                <span>349$</span>
                <span className="ml-1 text-red-400 line-through">550$</span>
              </div>
            </CardTitle>
          </CardHeader>
          <form action="/create-checkout-session" method="POST" className="pr-4 pl-4 mt-4 mb-4">
            <Input type="hidden" name="lookup_key" value="{{PRICE_LOOKUP_KEY}}"/>
            <Button color="secondary" size="xl" type="submit" className="w-full">
              Get started
            </Button>
          </form>
          <CardContent className="space-y-3 text-start">
            <div className="font-bold">What's include</div>
            {Object.keys(ENTERPRISE_FEATURES).map(key => (
              <div className="flex flex-row gap-1">
                {ENTERPRISE_FEATURES[key]
                  ? <CheckCircle size={24} className="text-green-400"/>
                  : <XCircle size={24} className="text-red-400"/>}
                {key}
              </div>
            ))}
          </CardContent>
        </div>
      </Card>
    </div>
  </div>
)