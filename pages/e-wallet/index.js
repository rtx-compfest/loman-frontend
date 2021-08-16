import {Grid} from '@chakra-ui/react'
import {Layout} from '@components/Layout'
import {NavUser} from '@components/Nav'
import React from 'react'

const Index = () => {
  return (
    <Layout hasNavbar={false}>
      <header>
        <NavUser />
      </header>

      <Grid as="main" marginBlock="85px" placeItems="center"></Grid>
    </Layout>
  )
}

export default Index
