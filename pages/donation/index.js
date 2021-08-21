import {Grid, Heading} from '@chakra-ui/react'
import {DonationCard} from '@components/Card'
import {Layout} from '@components/Layout'
import {NavAdmin, NavDonor, NavFundraiser} from '@components/Nav'
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
        console.error(err.message)
      })
  })

  return (
    <Layout hasNavbar={isAuthenticated() ? false : true}>
      {isAuthenticated() === 'donor' ? (
        <header>
          <NavDonor />
        </header>
      ) : (
        ''
      )}
      {isAuthenticated() === 'admin' ? (
        <header>
          <NavAdmin />
        </header>
      ) : (
        ''
      )}
      {isAuthenticated() === 'fundraiser' ? (
        <header>
          <NavFundraiser />
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
            {donationQuery?.data
              ?.filter((item) => item.case === 'Verified')
              .sort((a, b) => new Date(b.max_date) - new Date(a.max_date))
              .map((item) => {
                // eslint-disable-next-line no-unused-vars
                const {case: status, ...donation} = item

                return <DonationCard key={donation.id} {...donation} />
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
