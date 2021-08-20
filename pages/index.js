import {Grid, Heading} from '@chakra-ui/react'
import Dashboard from '@components/Dashboard'
import {Layout} from '@components/Layout'
import {NavDonor} from '@components/Nav'
import {useAuthContext} from '@context/auth'

function Home() {
  const {isAuthenticated} = useAuthContext()

  return (
    <Layout hasNavbar={isAuthenticated() === 'donor' ? false : true}>
      {isAuthenticated() === 'donor' ? (
        <header>
          <NavDonor />
        </header>
      ) : (
        ''
      )}
      <Grid as="main" marginBlock="85px" gap="8">
        <Heading size="xl">Dashboard</Heading>
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
        ></Dashboard>
      </Grid>
    </Layout>
  )
}

export default Home
