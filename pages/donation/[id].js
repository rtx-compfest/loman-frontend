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
  useDisclosure,
} from '@chakra-ui/react'
import {ChevronLeftIcon} from '@heroicons/react/outline'
import {BadgeCheckIcon} from '@heroicons/react/solid'
import differenceInDays from 'date-fns/differenceInDays'
import {useQuery} from 'react-query'
import {DonationCategory} from 'constant'

import formatCurrency from '@lib/formatCurrency'
import statusColor from '@lib/statusColor'
import backToHome from '@lib/backToHome'
import {Layout} from '@components/Layout'
import {useAuthContext} from '@context/auth'
import {NavAdmin, NavDonor, NavFundraiser} from '@components/Nav'
import {Withdraw} from '@components/Pages'
import {URL} from 'constant'

const imgLoader = ({src}) => {
  return src
}

const DetailDonation = () => {
  const router = useRouter()
  const {request, isAuthenticated} = useAuthContext()
  const {isOpen, onOpen, onClose} = useDisclosure()

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

  const verifyDonation = () => {
    console.log('verify')
  }

  const rejectDonation = () => {
    console.log('verify')
  }

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
      {donationQuery.isLoading ? <div>Loading...</div> : ''}
      {donationQuery.isSuccess ? (
        <Grid as="main" marginBlock="85px">
          <Grid>
            <Link as={NextLink} href={backToHome(isAuthenticated())}>
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
                src={
                  donationQuery.data?.image?.src == null
                    ? 'https://via.placeholder.com/280x155?text=Donation+Image'
                    : donationQuery.data.image.src
                }
                alt={
                  donationQuery.data.image?.alt == null
                    ? 'Image'
                    : donationQuery.data.image?.alt
                }
                width={
                  donationQuery.data.image?.width == null
                    ? '445'
                    : donationQuery.data.image?.width
                }
                height={
                  donationQuery.data.image?.height == null
                    ? '260'
                    : donationQuery.data.image?.height
                }
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
                  {isAuthenticated() === false ? (
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
                        isDisabled={sisaHari < 0 ? true : false}
                      >
                        Donate
                      </Button>
                    </Link>
                  ) : (
                    ''
                  )}
                  {isAuthenticated() === 'donor' ? (
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
                        isDisabled={sisaHari < 0 ? true : false}
                      >
                        Donate
                      </Button>
                    </Link>
                  ) : (
                    ''
                  )}
                  {isAuthenticated() === 'admin' ? (
                    <Button
                      colorScheme="green"
                      variant="solid"
                      width="50%"
                      isDisabled={sisaHari < 0 ? true : false}
                      onClick={verifyDonation}
                    >
                      {donationQuery.data.case === 'Pending' ? 'Verify' : ''}
                    </Button>
                  ) : (
                    ''
                  )}
                  {isAuthenticated() === 'admin' ? (
                    <Button
                      colorScheme="red"
                      variant="solid"
                      width="50%"
                      isDisabled={sisaHari < 0 ? true : false}
                      onClick={rejectDonation}
                    >
                      {donationQuery.data.case === 'Pending' ? 'Reject' : ''}
                    </Button>
                  ) : (
                    ''
                  )}
                  {isAuthenticated() === 'fundraiser' &&
                  donationQuery.data.case === 'Verified' ? (
                    <Button
                      colorScheme="green"
                      variant="solid"
                      width="65%"
                      isDisabled={sisaHari < 0 ? true : false}
                      onClick={onOpen}
                    >
                      Withdraw
                    </Button>
                  ) : (
                    ''
                  )}
                  {donationQuery.data.case === 'Verified' ? (
                    <Button variant="outline" width="35%">
                      Share
                    </Button>
                  ) : (
                    ''
                  )}
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
      <Withdraw id={id} isOpen={isOpen} onClose={onClose} />
    </Layout>
  )
}

export default DetailDonation
