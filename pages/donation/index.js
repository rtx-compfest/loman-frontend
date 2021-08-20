import {Grid, Heading} from '@chakra-ui/react'
import {DonationCard} from '@components/Card'
import {Layout} from '@components/Layout'
import {NavDonor} from '@components/Nav'
import {useAuthContext} from '@context/auth'
import {useQuery} from 'react-query'

function Donation() {
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
        <Heading size="xl">Donation List</Heading>
        {donationQuery?.isSuccess ? (
          <Grid
            templateColumns="repeat(auto-fill, minmax(280px, 1fr))"
            gap="10"
          >
            {donationQuery.data
              .sort((a, b) => new Date(b.max_date) - new Date(a.max_date))
              .map((item) => {
                // eslint-disable-next-line no-unused-vars
                const {case: status, ...donation} = item

                if (isAuthenticated() === 'donor') {
                  return <DonationCard key={donation.id} {...donation} />
                }

                return <DonationCard key={donation.id} {...item} />
              })}
          </Grid>
        ) : (
          ''
        )}
      </Grid>
    </Layout>
  )
}

export default Donation
