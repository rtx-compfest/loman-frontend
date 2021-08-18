import {useAuthContext} from '@context/auth'
import {useRouter} from 'next/router'

const ProtectedRoute = ({route, children}) => {
  const {isAuthenticated} = useAuthContext()
  const router = useRouter()

  if (isAuthenticated() !== route) {
    router.replace('/sign-in')
    return null
  }

  return children
}

export default ProtectedRoute
