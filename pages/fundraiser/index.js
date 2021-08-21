import Link from 'next/link'
import {Grid, Heading, Button, Icon} from '@chakra-ui/react'
import {PlusIcon} from '@heroicons/react/outline'
import {useQuery} from 'react-query'

import {NavFundraiser} from '@components/Nav'
import Dashboard from '@components/Dashboard'
import {Layout} from '@components/Layout'
import {useAuthContext} from '@context/auth'
import {ProtectedRoute} from '@components/Route'

function Fundraiser() {
  const {userData, request, isAuthenticated} = useAuthContext()

  const donationQuery = useQuery(`/donation_program`, () => {
    const options = {
      method: 'GET',
    }

    return request(`/donation_program`, options)
      .then((result) => {
        return result.data
      })
      .catch((err) => {
        console.error(err.message)
      })
  })

  const withdrawQuery = useQuery(`/wallet`, () => {
    const options = {
      method: 'GET',
    }

    return request(`/wallet`, options)
      .then((result) => {
        console.log(result)
        return result.data
      })
      .catch((err) => {
        console.error(err.message)
      })
  })

  return (
    <Layout hasNavbar={isAuthenticated() === 'fundraiser' ? false : true}>
      {isAuthenticated() === 'fundraiser' ? (
        <header>
          <NavFundraiser />
        </header>
      ) : (
        ''
      )}

      <Grid as="main" marginBlock="85px" gap="8">
        <Grid
          autoFlow="column dense"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading size="xl">Dashboard</Heading>
          <Link href="/fundraiser/create" passHref={true}>
            <Button
              as="a"
              variant="solid"
              colorScheme="green"
              justifyContent="space-between"
              alignItems="center"
              leftIcon={<Icon as={PlusIcon} stroke="white" boxSize="5" />}
            >
              Donation Program
            </Button>
          </Link>
        </Grid>
        <Dashboard
          props={
            donationQuery?.isSuccess && donationQuery?.data != null
              ? [
                  {
                    header: 'Donation',
                    link: '/fundraiser/all-donation',
                    data: [
                      ...donationQuery?.data
                        .filter((item) => item.user_id === userData.userId)
                        .slice(0, 3),
                    ],
                  },
                ]
              : [
                  {
                    header: 'Donation',
                    link: '/donation',
                    data: [],
                  },
                ]
          }
        />
        <Grid gap="5" width="100%">
          <Grid
            autoFlow="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Heading as="h3" fontSize="xl">
              Withdraw
            </Heading>
            <Link as={NextLink} href="/admin/withdraw" passHref={true}>
              <Button as="a" variant="outline" colorScheme="gray">
                See all withdraw request
              </Button>
            </Link>
          </Grid>

          <Grid
            templateColumns="repeat(auto-fill, minmax(280px, 1fr))"
            gap="10"
          >
            {withdrawQuery?.isSuccess && withdrawQuery?.data != null
              ? withdrawQuery.data.map((data, j) => (
                  <div key={j}>{data.name}</div>
                ))
              : `No withdraw request yet`}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default function FundraiserRoute() {
  return (
    <ProtectedRoute route="fundraiser">
      <Fundraiser />
    </ProtectedRoute>
  )
}
