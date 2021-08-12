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

const NavDonor = ({name, balance = 0}) => {
  return (
    <Nav>
      <List display="grid" gridGap="4" gridAutoFlow="column">
        <ListItem>
          <Link href="/">
            <a>Fundraising</a>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/history">
            <a>History</a>
          </Link>
        </ListItem>
      </List>
      <Menu placement="bottom-end">
        <MenuButton>
          <Avatar size="sm" name={name} />
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
              <Text as="strong">{name == null ? 'Name' : name}</Text>
              <Text>Donor</Text>
            </Grid>
          </MenuItem>
          <MenuDivider />
          <MenuItem>
            <Grid
              autoFlow="column dense"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Text>Balance</Text>
              <Text as="strong">{balance}</Text>
            </Grid>
          </MenuItem>
          <MenuDivider />
          <MenuItem>
            <Link href="/profile">
              <a>Profile</a>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/e-wallet">
              <a>E-Wallet</a>
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

export default NavDonor
