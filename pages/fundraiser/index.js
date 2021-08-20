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
            donationQuery?.isSuccess
              ? [
                  {
                    header: 'Donation',
                    link: '/donation',
                    data: [
                      ...donationQuery.data.filter(
                        (item) => item.case === 'Pending',
                      ),
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
