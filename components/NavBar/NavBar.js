import {Button, Box, Grid} from '@chakra-ui/react'

const NavBar = () => {
  return (
    <Grid>
      <Box>Logo</Box>
      <Grid autoFlow="column dense" gridAutoColumns="min-content" gap="24px">
        <Button colorScheme="green" variant="solid">
          Sign In
        </Button>
        <Button colorScheme="green" variant="outline">
          Sign Up
        </Button>
      </Grid>
    </Grid>
  )
}

export default NavBar
