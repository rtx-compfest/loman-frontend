import Image from 'next/image'
import {Grid} from '@chakra-ui/react'

// import Logo from '@public/static/Loman.png'

const Nav = ({children}) => {
  return (
    <Grid
      templateColumns="max-content 1fr"
      alignItems="center"
      paddingBlock="4"
      gap="5"
    >
      <Image
        src="/static/Loman.svg"
        alt="Loman Logo"
        width="98px"
        height="27px"
      />
      <Grid
        autoFlow="column dense"
        gap="5"
        alignItems="center"
        justifyContent="space-between"
      >
        {process.browser ? children : ''}
      </Grid>
    </Grid>
  )
}

export default Nav
