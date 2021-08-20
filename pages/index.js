import {Grid, Heading} from '@chakra-ui/react'
import Dashboard from '@components/Dashboard'
import {Layout} from '@components/Layout'
import {NavDonor} from '@components/Nav'
import {useAuthContext} from '@context/auth'
import {useQuery} from 'react-query'

function Home() {
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

  console.log(donationQuery)

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
          props={
            donationQuery?.isSuccess
              ? [
                  {
                    header: 'Donation',
                    link: '/donation',
                    data: [
                      ...donationQuery.data.map((item) => {
                        // eslint-disable-next-line no-unused-vars
                        const {case: status, ...donation} = item

                        return donation
                      }),
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
        ></Dashboard>
      </Grid>
    </Layout>
  )
}

export default Home
