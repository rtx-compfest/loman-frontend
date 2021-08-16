import * as React from 'react'
import NextLink from 'next/link'
import {useRouter} from 'next/router'
import {
  Heading,
  useRadioGroup,
  Text,
  Grid,
  Link,
  Icon,
  Textarea,
  Button,
} from '@chakra-ui/react'
import {ChevronLeftIcon} from '@heroicons/react/outline'

import {NavDonor} from '@components/Nav'
import {Layout} from '@components/Layout'
import {RadioCard} from '@components/Card'
import formatCurrency from '@lib/formatCurrency'

const Donate = () => {
  const donationAmounts = [10000, 25000, 50000, 100000, 200000, 500000]

  const router = useRouter()
  const {id} = router.query

  const {getRootProps, getRadioProps} = useRadioGroup({
    name: 'donationAmounts',
    defaultValue: 10000,
    onChange: (values) => {
      console.log(values)
    },
  })

  const group = getRootProps()

  return (
    <Layout hasNavbar={false}>
      <header>
        <NavDonor />
      </header>

      <Grid as="main" marginBlock="85px" placeItems="center">
        <Grid maxWidth="500px" width="100%">
          <Link as={NextLink} href={`../${id}`}>
            <a style={{width: 'fit-content', marginLeft: '20px'}}>
              <Grid
                autoFlow="column dense"
                gap="2"
                autoColumns="min-content max-content"
                alignItems="center"
                width="fit-content"
                pr="4"
                color="gray.600"
              >
                <Icon as={ChevronLeftIcon} />
                <Text>Back to detail donation</Text>
              </Grid>
            </a>
          </Link>
          <Grid gap="4" p={5} textAlign="left" height="fit-content">
            <Heading as="h2" size="lg">
              Title {id}
            </Heading>
            <Grid gap="4">
              <Text>Enter the donation amount</Text>
              <Grid {...group} templateColumns="repeat(3, 1fr)" gap="5">
                {donationAmounts.map((value) => {
                  const radio = getRadioProps({value})

                  return (
                    <RadioCard key={value} {...radio}>
                      {formatCurrency(value).slice(0, -3)}
                    </RadioCard>
                  )
                })}
              </Grid>
            </Grid>
            <Grid gap="4" mt="5">
              <Text>Pray in this donation (optional)</Text>
              <Textarea placeholder="Semoga cepat sembuh"></Textarea>
            </Grid>
            <Button variant="solid" colorScheme="green">
              Donate
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Donate
