import {Grid, Heading} from '@chakra-ui/react'

import Dashboard from '@components/Dashboard'
import {Layout} from '@components/Layout'
import {NavAdmin} from '@components/Nav'
import {useAuthContext} from '@context/auth'

const Admin = () => {
  const {isAuthenticated} = useAuthContext()

  return (
    <Layout hasNavbar={isAuthenticated() === 'admin' ? false : true}>
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
    </Layout>
  )
}

export default Admin
