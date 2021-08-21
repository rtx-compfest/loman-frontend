import {Button, Icon} from '@chakra-ui/react'
import {LogoutIcon} from '@heroicons/react/outline'

import {useAuthContext} from '@context/auth'
import {useRouter} from 'next/router'

const LogoutButton = ({props}) => {
  const {logout} = useAuthContext()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/sign-in')
  }

  return (
    <Button
      width="100%"
      variant="outline"
      colorScheme="gray"
      justifyContent="space-between"
      alignItems="center"
      rightIcon={<Icon as={LogoutIcon} stroke="gray.400" boxSize="5" />}
      onClick={handleLogout}
      {...props}
    >
      Log out
    </Button>
  )
}

export default LogoutButton
