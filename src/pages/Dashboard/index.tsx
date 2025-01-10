import {AuthPageWrapper} from "../AuthPageWrapper"
import {observer} from "mobx-react"
import {useEffect} from "react"
import {useOnbording} from "../../hooks/useOnbording.ts"

export const Dashboard = observer(() => {
  const showOnbording = useOnbording()

  useEffect(() => {
    setTimeout(() => {
      showOnbording('dashboard', [
        {
          selector: '#user',
          content: () => (
            <div>
              <div className="text-start text-body-3 text-gray-900">
                Welcome 👋
              </div>
              <div className="text-start text-body-3 text-gray-900">
                We are glad to see you among our users! Ahead of you lies an exciting journey into the world of opportunities and amenities that we offer. We created this platform to make your experience as comfortable and productive as possible.
              </div>
            </div>
          ),
        },
        {
          selector: '#active-campaign',
          content: () => (
            <div className="text-start text-body-3 text-gray-900">
              We have already created the first company for you to make your start even easier.
            </div>
          )
        },
        {
          selector: '#add-campaign',
          content: () => (
            <div className="text-start text-body-3 text-gray-900">
              To create additional companies, click here
            </div>
          )
        }
      ])
    }, 1000)
  }, [])

  return <AuthPageWrapper>
    <div>
      Dashboard Page
    </div>
  </AuthPageWrapper>
})
