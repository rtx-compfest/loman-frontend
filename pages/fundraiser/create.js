import Head from 'next/head'
import {Container, Grid, Heading} from '@chakra-ui/react'

import {NavFundraiser} from '@components/Nav'
import Footer from '@components/Footer'

export default function Create() {
  return (
    <Container maxWidth="container.lg">
      <Head>
        <title>Create Donation Program | Loman | Fundraiser</title>
        <meta name="description" content="Fundraiser" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <NavFundraiser />
      </header>

      <Grid as="main" marginBlock="85px" gap="8">
        <Grid
          maxWidth="720px"
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="6"
        >
          <Heading size="xl">New Fundraising</Heading>
        </Grid>
      </Grid>

      <footer>
        <Footer />
      </footer>
    </Container>
  )
}
