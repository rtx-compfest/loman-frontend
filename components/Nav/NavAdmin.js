import Link from 'next/link'
import {
  Avatar,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  MenuItem,
  Grid,
  Text,
} from '@chakra-ui/react'

import Nav from './Nav'
import {LogoutButton} from '@components/Button'

const NavAdmin = () => {
  return (
    <Nav>
      <List display="grid" gridGap="4" gridAutoFlow="column">
        <ListItem>
          <Link href="/">
            <a>Dashboard</a>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/fundraising">
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
            <Grid
              padding="3"
              border="1px"
              borderColor="gray.300"
              borderRadius="3"
              width="100%"
              background="white"
            >
              <Text as="strong">Admin</Text>
            </Grid>
          </MenuItem>
          <MenuDivider />
          <MenuItem>
            <Link href="/profile">
              <a>Profile</a>
            </Link>
          </MenuItem>
          <MenuItem as="div">
            <LogoutButton />
          </MenuItem>
        </MenuList>
      </Menu>
    </Nav>
  )
}

export default NavAdmin
