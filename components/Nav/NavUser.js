import Link from 'next/link'
import {
  Avatar,
  Button,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'

import Nav from './Nav'

const NavUser = () => {
  return (
    <Nav>
      <List display="grid" gridGap="4" gridAutoFlow="column">
        <ListItem>
          <Link href="/">
            <a>Fundraising</a>
          </Link>
        </ListItem>
      </List>
      <Menu placement="bottom-end">
        <MenuButton>
          <Avatar size="sm" />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Link href="/sign-up" passHref={true}>
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
            <Link href="/sign-in" passHref={true}>
              <Button colorScheme="green" variant="solid" as="a" width="100%">
                Sign In
              </Button>
            </Link>
          </MenuItem>
        </MenuList>
      </Menu>
    </Nav>
  )
}

export default NavUser
