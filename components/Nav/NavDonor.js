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
  Button,
} from '@chakra-ui/react'

import Nav from './Nav'
import {Logout} from '@components/Button'

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
      <Grid autoFlow="column dense" gap="4" alignItems="center">
        <Link href="#" passHref={true}>
          <Button
            leftIcon={
              <Icon
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                boxSize="5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </Icon>
            }
            colorScheme="green"
            variant="solid"
            as="a"
            size="sm"
          >
            Top up
          </Button>
        </Link>
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
            <MenuItem as="div">
              <Logout />
            </MenuItem>
          </MenuList>
        </Menu>
      </Grid>
    </Nav>
  )
}

export default NavDonor
