import {Button, Icon} from '@chakra-ui/react'
import {LogoutIcon} from '@heroicons/react/outline'

const LogoutButton = ({props}) => {
  return (
    <Button
      width="100%"
      variant="outline"
      colorScheme="gray"
      justifyContent="space-between"
      alignItems="center"
      rightIcon={<Icon as={LogoutIcon} stroke="gray.400" boxSize="5" />}
      {...props}
    >
      Log out
    </Button>
  )
}

export default LogoutButton
