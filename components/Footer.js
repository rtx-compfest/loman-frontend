import {Grid, Text} from '@chakra-ui/react'

const Footer = () => {
  return (
    <Grid
      templateColumns="max-content 1fr"
      alignItems="center"
      paddingBlock="4"
      gap="5"
      borderTop="2px"
      borderColor="gray.100"
    >
      <Text color="gray.500">
        Copyright © 2021 Loman. All Rights Reserved
      </Text>
    </Grid>
  )
}

export default Footer
