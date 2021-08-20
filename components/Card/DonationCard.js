import Image from 'next/image'
import Link from 'next/link'
import {Box, Grid, Heading, Icon, Progress, Tag, Text} from '@chakra-ui/react'
import {BadgeCheckIcon} from '@heroicons/react/solid'
import differenceInDays from 'date-fns/differenceInDays'
import formatCurrency from '@lib/formatCurrency'
import {URL, DonationCategory} from 'constant'
import statusColor from '@lib/statusColor'

const imgLoader = ({src}) => {
  return src
}

const DonationCard = ({
  id = 0,
  donation_name = 'Donation',
  name = 'fundraiser',
  collected_amount = 0,
  expected_amount = 100,
  max_date = 0,
  case: status,
  donation_category = 'donation',
  photos,
}) => {
  const image = {
    src:
      photos != null
        ? `${URL}/image/donation_program/${photos}`
        : 'https://via.placeholder.com/280x155?text=Donation+Image',
    alt: 'Alt Image',
    width: 280,
    height: 155,
  }

  const sisaHari = differenceInDays(new Date(max_date), new Date())

  return (
    <Link href={`donation/${id}`}>
      <a>
        <Grid
          gap="3"
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="6"
          textAlign="left"
          height="fit-content"
        >
          <Image
            loader={imgLoader}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
          />
          <Grid
            alignItems="center"
            justifyContent="space-between"
            gap="4"
            autoFlow="column"
          >
            {donation_category != null && donation_category !== '' ? (
              <Tag>{DonationCategory.get(donation_category)}</Tag>
            ) : (
              ''
            )}
            {status != null && status !== '' ? (
              <Tag variant="solid" colorScheme={statusColor(status)}>
                {status}
              </Tag>
            ) : (
              ''
            )}
          </Grid>
          <Heading as="h4" size="md">
            {donation_name}
          </Heading>
          <Box display="flex" gridGap="2" alignItems="center">
            <Text as="strong" size="md" color="gray.700">
              {name}
            </Text>
            <Icon as={BadgeCheckIcon} fill="blue.400" boxSize="5" />
          </Box>
          <Progress
            colorScheme="green"
            value={collected_amount}
            max={expected_amount}
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
                {formatCurrency(collected_amount).slice(0, -3)}
              </Text>
            </Grid>
            <Grid textAlign="right" gap="1">
              <Text fontSize="sm" color="gray.600">
                Sisa hari
              </Text>
              <Text as="strong" fontSize="lg" color="gray.700">
                {sisaHari != null && sisaHari >= 0 ? sisaHari : '-'}
              </Text>
            </Grid>
          </Grid>
        </Grid>
      </a>
    </Link>
  )
}

export default DonationCard
