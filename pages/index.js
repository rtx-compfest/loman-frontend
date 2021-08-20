import {Grid, Heading} from '@chakra-ui/react'
import Dashboard from '@components/Dashboard'
import {Layout} from '@components/Layout'
import {NavDonor} from '@components/Nav'
import {useAuthContext} from '@context/auth'
import {useQuery} from 'react-query'
import differenceInDays from 'date-fns/differenceInDays'
import {ProtectedRoute} from '@components/Route'

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
                      ...donationQuery.data
                        .filter((item) => item.case === 'Verified')
                        .map((item) => {
                          // eslint-disable-next-line no-unused-vars
                          const {case: status, ...donation} = item

                          return donation
                        })
                        .filter((item) => {
                          if (
                            differenceInDays(
                              new Date(item.max_date),
                              new Date(),
                            ) >= 0
                          ) {
                            return item
                          }
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

export default function HomeRoute() {
  return (
    <ProtectedRoute route={[false, 'donor']}>
      <Home />
    </ProtectedRoute>
  )
}
