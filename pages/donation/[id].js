import Image from 'next/image'
import {useRouter} from 'next/router'
import NextLink from 'next/link'
import {
  Button,
  ButtonGroup,
  Grid,
  Heading,
  Progress,
  Icon,
  Link,
  Text,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Box,
  Tag,
} from '@chakra-ui/react'
import {ChevronLeftIcon} from '@heroicons/react/outline'
import {BadgeCheckIcon} from '@heroicons/react/solid'
import differenceInDays from 'date-fns/differenceInDays'
import {useQuery} from 'react-query'
import {DonationCategory} from 'constant'

import formatCurrency from '@lib/formatCurrency'
import statusColor from '@lib/statusColor'
import {Layout} from '@components/Layout'
import {useAuthContext} from '@context/auth'
import {NavDonor} from '@components/Nav'
import {URL} from 'constant'

const imgLoader = ({src}) => {
  return src
}

const DetailDonation = () => {
  const router = useRouter()
  const {request, isAuthenticated} = useAuthContext()
  const {id} = router.query

  const donationQuery = useQuery(`/donation/${id}`, () => {
    const options = {
      method: 'GET',
    }

    return request(`/donation_program/${id}`, options)
      .then((result) => {
        result.data.image = {
          src: `${URL}/image/donation_program/${result.data.photos}`,
          alt: 'Alt Image',
          width: 445,
          height: 260,
        }

        return result.data
      })
      .catch((err) => {
        console.error(err)
        return new Error(err)
      })
  })

  const sisaHari = donationQuery.isSuccess
    ? differenceInDays(new Date(donationQuery.data.max_date), new Date())
    : 0

  return (
    <Layout hasNavbar={isAuthenticated() === 'donor' ? false : true}>
      {isAuthenticated() === 'donor' ? (
        <header>
          <NavDonor />
        </header>
      ) : (
        ''
      )}
      {donationQuery.isLoading ? <div>Loading...</div> : ''}
      {donationQuery.isSuccess ? (
        <Grid as="main" marginBlock="85px">
          <Grid>
            <Link as={NextLink} href="/">
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
                  <Text>Back to home</Text>
                </Grid>
              </a>
            </Link>
            <Grid
              gap="8"
              p={5}
              textAlign="left"
              height="fit-content"
              templateColumns="repeat(2, 1fr)"
            >
              <Image
                loader={imgLoader}
                src={donationQuery.data.image.src}
                alt={donationQuery.data.image.alt}
                width={donationQuery.data.image.width}
                height={donationQuery.data.image.height}
              />
              <Grid gap="4" height="fit-content">
                <Grid
                  autoFlow="column"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text color="gray.600">
                    {DonationCategory.get(
                      donationQuery.data.donation_category,
                    )}
                  </Text>
                  {isAuthenticated() !== 'donor' ? (
                    <Tag
                      variant="solid"
                      colorScheme={statusColor(donationQuery.data.case)}
                    >
                      {donationQuery.data.case}
                    </Tag>
                  ) : (
                    ''
                  )}
                </Grid>
                <Heading as="h2" size="lg">
                  {donationQuery.data.donation_name}
                </Heading>
                <Box display="flex" gridGap="2" alignItems="center">
                  <Text as="strong" size="md" color="gray.700">
                    {donationQuery.data.name}
                  </Text>
                  <Icon as={BadgeCheckIcon} fill="blue.400" boxSize="5" />
                </Box>
                <Progress
                  colorScheme="green"
                  value={donationQuery.data.collected_amount}
                  max={donationQuery.data.expected_amount}
                  size="sm"
                  borderRadius="3"
                />
                <Grid
                  autoFlow="column dense"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid spacing="1">
                    <Text fontSize="sm" color="gray.600">
                      Terkumpul
                    </Text>
                    <Text as="strong" fontSize="lg" color="green">
                      {formatCurrency(
                        donationQuery.data.collected_amount,
                      ).slice(0, -3)}
                    </Text>
                  </Grid>
                  <Grid textAlign="right" gap="1">
                    <Text fontSize="sm" color="gray.600">
                      Sisa hari
                    </Text>
                    <Text as="strong" fontSize="lg" color="gray.700">
                      {sisaHari >= 0 ? sisaHari : 'Fundraising ends'}
                    </Text>
                  </Grid>
                </Grid>
                <ButtonGroup spacing="4">
                  <Link
                    as={NextLink}
                    href={sisaHari <= 0 ? `${id}` : `${id}/donate`}
                    passHref={true}
                  >
                    <Button
                      colorScheme="green"
                      as="a"
                      variant="solid"
                      width="65%"
                      isDisabled={sisaHari <= 0 ? true : false}
                    >
                      Donate
                    </Button>
                  </Link>
                  <Button variant="outline" width="35%">
                    Share
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Grid>
          <Box p="5">
            <Tabs variant="enclosed">
              <TabList>
                <Tab>Fundraiser</Tab>
                <Tab>Description</Tab>
                <Tab>Document</Tab>
                <Tab>Donor</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <p>{donationQuery.data.name}</p>
                </TabPanel>
                <TabPanel>
                  <p>{donationQuery.data.donation_description}</p>
                </TabPanel>
                <TabPanel>
                  <p>Document</p>
                </TabPanel>
                <TabPanel>
                  <p>
                    {donationQuery.data.donor != null &&
                    donationQuery.data.donor.length !== 0
                      ? donationQuery.data.donor.map((donor) => {
                          return (
                            <div key={donor.user_id}>
                              {donor.name} - {donor.amount_donation}
                            </div>
                          )
                        })
                      : 'Belum ada orang dermawan'}
                  </p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Grid>
      ) : (
        ''
      )}
    </Layout>
  )
}

export default DetailDonation
