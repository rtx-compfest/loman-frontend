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
import {LogoutButton} from '@components/Button'
import {PlusIcon} from '@heroicons/react/outline'
import {useAuthContext} from '@context/auth'
import {useEffect, useState} from 'react'

const NavDonor = () => {
  const [user, setUser] = useState(null)
  const {userData, request} = useAuthContext()

  useEffect(() => {
    const options = {
      method: 'GET',
    }

    if (userData == undefined) {
      return
    }

    request(`/user/${userData?.userId}`, options)
      .then((result) => {
        setUser(result.data)
        return result.data
      })
      .catch((err) => {
        console.error(err)
        return new Error(err)
      })
  }, [userData, request])

  return (
    <Nav>
      <List display="grid" gridGap="4" gridAutoFlow="column">
        <ListItem>
          <Link href="/">
            <a>Dashboard</a>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/donation">
            <a>Donation</a>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/history">
            <a>History</a>
          </Link>
        </ListItem>
      </List>
      <Grid autoFlow="column dense" gap="4" alignItems="center">
        <Link href="/e-wallet/topup" passHref={true}>
          <Button
            leftIcon={<Icon boxSize="4" as={PlusIcon} />}
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
            <Avatar size="sm" name={user != null ? user.name : ''} />
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
                <Text as="strong">{user != null ? user?.name : 'Name'}</Text>
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
                <Text as="strong">{user != null ? user?.amount : '0'}</Text>
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
              <LogoutButton />
            </MenuItem>
          </MenuList>
        </Menu>
      </Grid>
    </Nav>
  )
}

export default NavDonor
