import Link from 'next/link'
import Image from 'next/image'
import {
  Avatar,
  Button,
  Grid,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'

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

      <Menu placement="bottom-end">
        <MenuButton>
          <Avatar size="sm" />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Link href="#" passHref={true}>
              <Button
                colorScheme="green"
                variant="outline"
                as="a"
                width="100%"
              >
                Sign Up
              </Button>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="#" passHref={true}>
              <Button colorScheme="green" variant="solid" as="a" width="100%">
                Sign In
              </Button>
            </Link>
          </MenuItem>
        </MenuList>
      </Menu>
    </Grid>
  )
}

export default Nav
