import {Grid, Heading} from '@chakra-ui/react'
import {DonationCard} from '@components/Card'
import {Layout} from '@components/Layout'
import {NavFundraiser} from '@components/Nav'
import {useAuthContext} from '@context/auth'
import {useQuery} from 'react-query'

function DonationList() {
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

  return (
    <Layout hasNavbar={false}>
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
            {donationQuery?.data?.map((item) => {
              if (item.user_id === userData?.userId) {
                return <DonationCard key={item.id} {...item} />
              }
            })}
          </Grid>
        ) : (
          ''
        )}
      </Grid>
    </Layout>
  )
}

export default DonationList
