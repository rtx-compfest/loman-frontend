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
import formatCurrency from '@lib/formatCurrency'

import {Layout} from '@components/Layout'

const imgLoader = ({src}) => {
  return src
}

const DetailDonation = ({
  name = 'Donation name',
  fundraiser = 'Fundraiser',
  amount = 0,
  target_amount = 100,
  deadline = 0,
  image = {
    src: 'https://via.placeholder.com/445x260?text=Donation+Image',
    alt: 'Alt Image',
    width: 445,
    height: 260,
  },
  user = 'donor',
}) => {
  const router = useRouter()
  const {id} = router.query

  console.log(id)

  return (
    <Layout>
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
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
            />
            <Grid gap="4" height="fit-content">
              <Grid
                autoFlow="column"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text color="gray.600">Category</Text>
                {user !== 'donor' ? (
                  <Tag variant="solid" colorScheme="yellow">
                    Pending
                  </Tag>
                ) : (
                  ''
                )}
              </Grid>
              <Heading as="h2" size="lg">
                {name}
              </Heading>
              <Grid
                autoFlow="column dense"
                autoColumns="min-content min-content"
                gap="2"
                alignItems="center"
              >
                <Text
                  as="strong"
                  size="md"
                  color="gray.700"
                  width="min-content"
                >
                  {fundraiser}
                </Text>
                <Icon as={BadgeCheckIcon} fill="blue.400" boxSize="5" />
              </Grid>
              <Progress
                colorScheme="green"
                value={amount}
                max={target_amount}
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
                    {formatCurrency(amount).slice(0, -3)}
                  </Text>
                </Grid>
                <Grid textAlign="right" gap="1">
                  <Text fontSize="sm" color="gray.600">
                    Sisa hari
                  </Text>
                  <Text as="strong" fontSize="lg" color="gray.700">
                    {differenceInDays(new Date(deadline), new Date())}
                  </Text>
                </Grid>
              </Grid>
              <ButtonGroup spacing="4">
                <Button colorScheme="green" variant="solid" width="65%">
                  Donate
                </Button>
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
              <Tab>Doa</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <p>Fundraiser</p>
              </TabPanel>
              <TabPanel>
                <p>Description</p>
              </TabPanel>
              <TabPanel>
                <p>Document</p>
              </TabPanel>
              <TabPanel>
                <p>Donor</p>
              </TabPanel>
              <TabPanel>
                <p>Doa</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Grid>
    </Layout>
  )
}

export default DetailDonation
