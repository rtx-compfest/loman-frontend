import NextLink from 'next/link'
import {Button, Grid, Heading, Link} from '@chakra-ui/react'

import Dashboard from '@components/Dashboard'
import {Layout} from '@components/Layout'
import {NavAdmin} from '@components/Nav'
import {ProtectedRoute} from '@components/Route'
import {useAuthContext} from '@context/auth'
import {useQuery} from 'react-query'
import {FundraiserRequest} from '@components/Card'
import differenceInDays from 'date-fns/differenceInDays'

export const Admin = () => {
  const {request, isAuthenticated} = useAuthContext()

  const donationQuery = useQuery(`/donation_program`, () => {
    const options = {
      method: 'GET',
    }

    return request(`/donation_program`, options)
      .then((result) => {
        return result.data
      })
      .catch((err) => {
        console.error(err)
        return new Error(err)
      })
  })

  const withdrawQuery = useQuery(`/wallet/withdraw?status=0`, () => {
    const options = {
      method: 'GET',
    }

    return request(`/wallet/withdraw?status=0`, options)
      .then((result) => {
        return result.data
      })
      .catch((err) => {
        console.error(err)
        return new Error(err)
      })
  })

  const fundraiserQuery = useQuery(`/user/fundraiser?status=0`, () => {
    const options = {
      method: 'GET',
    }

    return request(`/user/fundraiser?status=0`, options)
      .then((result) => {
        return result.data
      })
      .catch((err) => {
        console.error(err)
        return new Error(err)
      })
  })

  return (
    <Layout hasNavbar={false}>
      {isAuthenticated() === 'admin' ? (
        <header>
          <NavAdmin />
        </header>
      ) : (
        ''
      )}
      <Grid as="main" marginBlock="85px" gap="8">
        <Heading size="xl">Dashboard</Heading>
        <Dashboard
          props={
            donationQuery?.isSuccess
              ? [
                  {
                    header: 'Donation',
                    link: '/admin/donation',
                    data: [
                      ...donationQuery.data
                        .filter((item) => item.case === 'Pending')
                        .filter((item) => {
                          if (
                            differenceInDays(
                              new Date(item.max_date),
                              new Date(),
                            ) >= 0
                          ) {
                            return item
                          }
                        })
                        .slice(0, 6),
                    ],
                  },
                ]
              : [
                  {
                    header: 'Donation',
                    link: '/all-donation',
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
            {withdrawQuery?.isSuccess && withdrawQuery.data.length > 0
              ? withdrawQuery.data.map((data, j) => <div key={j}>Hi</div>)
              : `No withdraw request yet`}
          </Grid>
        </Grid>
        <Grid gap="5" width="100%">
          <Grid
            autoFlow="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Heading as="h3" fontSize="xl">
              Fundraiser
            </Heading>
            <Link as={NextLink} href="/admin/fundraiser" passHref={true}>
              <Button as="a" variant="outline" colorScheme="gray">
                See all fundraiser request
              </Button>
            </Link>
          </Grid>

          <Grid
            templateColumns="repeat(auto-fill, minmax(280px, 1fr))"
            gap="10"
          >
            {fundraiserQuery?.isSuccess && fundraiserQuery.data.length > 0
              ? fundraiserQuery.data.map((data) => (
                  <FundraiserRequest key={data.id} {...data} />
                ))
              : `No fundraiser request yet`}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default function AdminRoute() {
  return (
    <ProtectedRoute route="admin">
      <Admin />
    </ProtectedRoute>
  )
}
