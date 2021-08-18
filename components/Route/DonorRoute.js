import {useAuthContext} from '@context/auth'
import {useRouter} from 'next/router'

const DonorRoute = ({children}) => {
  const {isLoggedInAsDonor} = useAuthContext()
  const router = useRouter()

  if (!isLoggedInAsDonor()) {
    router.replace('/sign-in')
    return null
  }

  return children
}

export default DonorRoute
