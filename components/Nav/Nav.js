import Link from 'next/link'
import Image from 'next/image'
import {Button, Grid, List, ListItem} from '@chakra-ui/react'

// import Logo from '@public/static/Loman.png'

const Nav = () => {
  return (
    <Grid
      autoFlow="column dense"
      justifyContent="space-between"
      alignItems="center"
      paddingBlock="4"
    >
      <Grid autoFlow="column dense" gap="5" alignItems="center">
        <Image
          src="/static/Loman.svg"
          alt="Loman Logo"
          width="98px"
          height="27px"
        />
        <List display="grid" gridGap="4" gridAutoFlow="column">
          <ListItem>
            <Link href="/">
              <a>Fundraising</a>
            </Link>
          </ListItem>
        </List>
      </Grid>

      <Grid autoFlow="column dense" gridAutoColumns="min-content" gap="4">
        <Link href="#" passHref={true}>
          <Button colorScheme="green" variant="solid" as="a">
            Sign In
          </Button>
        </Link>
      </Grid>
    </Grid>
  )
}

export default Nav
