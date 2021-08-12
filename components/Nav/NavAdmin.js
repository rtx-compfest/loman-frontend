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
  Icon,
} from '@chakra-ui/react'

import Nav from './Nav'

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
          <MenuItem>
            <Grid
              width="100%"
              background="white"
              padding="2"
              border="1px"
              borderColor="gray.300"
              borderRadius="3"
              justifyContent="space-between"
              autoFlow="column dense"
              alignItems="center"
            >
              Log out
              <Icon
                fill="none"
                viewBox="0 0 24 24"
                stroke="gray.400"
                boxSize="5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </Icon>
            </Grid>
          </MenuItem>
        </MenuList>
      </Menu>
    </Nav>
  )
}

export default NavAdmin
