import {Button, Icon} from '@chakra-ui/react'

const Logout = ({props}) => {
  return (
    <Button
      width="100%"
      variant="outline"
      colorScheme="gray"
      justifyContent="space-between"
      alignItems="center"
      rightIcon={
        <Icon fill="none" viewBox="0 0 24 24" stroke="gray.400" boxSize="5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </Icon>
      }
      {...props}
    >
      Log out
    </Button>
  )
}

export default Logout
