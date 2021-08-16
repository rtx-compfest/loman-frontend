import React from 'react'
import {Layout} from '@components/Layout'
import {NavDonor} from '@components/Nav'
import {Grid} from '@chakra-ui/react'

const TopUp = () => {
  return (
    <Layout hasNavbar={false}>
      <header>
        <NavDonor />
      </header>

      <Grid as="main" marginBlock="85px" placeItems="center">
        <Grid maxWidth="500px" width="100%"></Grid>
      </Grid>
    </Layout>
  )
}

export default TopUp
