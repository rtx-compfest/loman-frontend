import Link from 'next/link'
import {Grid, Heading, Button, Icon} from '@chakra-ui/react'
import {PlusIcon} from '@heroicons/react/outline'

import {NavFundraiser} from '@components/Nav'
import Footer from '@components/Footer'
import Dashboard from '@components/Dashboard'
import {Layout} from '@components/Layout'
import {useAuthContext} from '@context/auth'
import {ProtectedRoute} from '@components/Route'

function Fundraiser() {
  const {isAuthenticated} = useAuthContext()

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
          props={[
            {
              header: 'Donation',
              link: '/donation',
              data: [
                {
                  id: 1,
                  name: 'Bantuan untuk Tenaga Kesehatan Yang Jalani Isolasi',
                  target_amount: 500000000,
                  amount: 18584332,
                  deadline: '2021-08-31',
                  fundraiser: 'Kitabisa.com',
                  category: 'Pendidikan',
                },
              ],
            },
          ]}
        />
      </Grid>

      <footer>
        <Footer />
      </footer>
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
