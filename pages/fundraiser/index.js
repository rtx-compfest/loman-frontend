import Link from 'next/link'
import Head from 'next/head'
import {Container, Grid, Heading, Button, Icon} from '@chakra-ui/react'
import {PlusIcon} from '@heroicons/react/outline'

import {NavFundraiser} from '@components/Nav'
import {DonationCard} from '@components/Card'
import Footer from '@components/Footer'

const donations = [
  {
    id: 1,
    name: 'Bantuan untuk Tenaga Kesehatan Yang Jalani Isolasi',
    target_amount: 500000000,
    amount: 18584332,
    deadline: '2021-08-31',
    fundraiser: 'Kitabisa.com',
  },
]

export default function Home() {
  return (
    <Container maxWidth="container.lg">
      <Head>
        <title>Loman | Fundraiser</title>
        <meta name="description" content="Fundraiser" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <NavFundraiser />
      </header>

      <Grid as="main" marginBlock="85px" gap="8">
        <Grid
          autoFlow="column dense"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading size="xl">Dashboard</Heading>
          <Link href="/fundraiser/create" passHref={true}>
            <Button
              as="a"
              variant="solid"
              colorScheme="green"
              justifyContent="space-between"
              alignItems="center"
              leftIcon={<Icon as={PlusIcon} stroke="white" boxSize="5" />}
            >
              Donation Program
            </Button>
          </Link>
        </Grid>
        <Grid
          templateColumns="repeat(auto-fill, minmax(280px, 1fr))"
          gap="10"
        >
          {donations.map((donation) => {
            return <DonationCard key={donation.id} {...donation} />
          })}
        </Grid>
      </Grid>

      <footer>
        <Footer />
      </footer>
    </Container>
  )
}
