import Link from 'next/link'
import {
  Button,
  Grid,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import {PlusIcon} from '@heroicons/react/outline'
import {format} from 'date-fns'

import {Layout} from '@components/Layout'
import {NavDonor} from '@components/Nav'
import formatCurrency from '@lib/formatCurrency'

const Index = () => {
  return (
    <Layout hasNavbar={false}>
      <header>
        <NavDonor />
      </header>

      <Grid as="main" marginBlock="85px">
        <Grid>
          <Grid gap="4" p={5} textAlign="left" height="fit-content">
            <Heading as="h2" size="lg">
              E-Wallet
            </Heading>
            <Grid
              p="4"
              border="1px"
              borderColor="gray.300"
              borderRadius="6"
              autoFlow="column"
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid gap="2">
                <Text>Balance</Text>
                <Text as="strong" fontSize="lg">
                  {formatCurrency(10000).slice(0, -3)}
                </Text>
              </Grid>
              <Grid p="2">
                <Link href="e-wallet/topup" passHref={true}>
                  <Button
                    leftIcon={<Icon boxSize="4" as={PlusIcon} />}
                    colorScheme="green"
                    variant="outline"
                    as="a"
                    size="md"
                  >
                    Top up
                  </Button>
                </Link>
              </Grid>
            </Grid>
            <Grid marginBlock="5">
              <Heading as="h4" size="md">
                Transaction History
              </Heading>
              <Table variant="simple" marginBlock="4">
                <Thead>
                  <Tr>
                    <Th>No</Th>
                    <Th>Transaction ID</Th>
                    <Th>Date</Th>
                    <Th>Type</Th>
                    <Th>Amount</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>1</Td>
                    <Td>128937</Td>
                    <Td>{format(new Date(), 'dd-MM-yyyy')}</Td>
                    <Td>Top Up</Td>
                    <Td>{formatCurrency(10000)}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Index
