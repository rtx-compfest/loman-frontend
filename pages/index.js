import {Layout} from '@components/Layout'
import {NavDonor} from '@components/Nav'
import {useAuthContext} from '@context/auth'

// const donation = {
//   name: 'Bantuan untuk Tenaga Kesehatan Yang Jalani Isolasi',
//   target_amount: 500000000,
//   amount: 18584332,
//   deadline: '2021-08-31',
//   fundraiser: 'Kitabisa.com',
//   status: 'Pending',
//   category: 'Pendidikan',
// }

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
      {/*Use the dashboard component and prepare the props*/}
      {/*<Grid as="main" marginBlock="85px" gap="8">*/}
      {/*  <Heading size="xl">Fundraising</Heading>*/}
      {/*  <Grid*/}
      {/*    templateColumns="repeat(auto-fill, minmax(280px, 1fr))"*/}
      {/*    gap="10"*/}
      {/*  >*/}
      {/*    <DonationCard/>*/}
      {/*    <DonationCard {...donation} /> */}
      {/*  </Grid>*/}
      {/*</Grid>*/}
    </Layout>
  )
}

export default Home
