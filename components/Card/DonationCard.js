import Image from 'next/image'
import {Grid, Progress, Text, VStack, HStack} from '@chakra-ui/react'

const imgLoader = ({src}) => {
  return src
}

const DonationCard = ({
  name = 'Donation name',
  fundraiser = 'Fundraiser',
  amount = 0,
  target_amount = 0,
  deadline = 0,
}) => {
  const image = {
    src: 'https://via.placeholder.com/280x155?text=Donation+Image',
    alt: 'Alt Image',
    width: 280,
    height: 155,
  }

  return (
    <VStack spacing="3" padding="4">
      <Image
        loader={imgLoader}
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
      />
      <Text as="strong" size="6">
        {name}
      </Text>
      <Text as="strong" size="4">
        {fundraiser}
      </Text>
      <Progress colorScheme="green" value={amount / target_amount} size="s" />
      <Grid
        autoFlow="column dense"
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack spacing="1">
          <Text size="3">Terkumpul</Text>
          <Text as="strong" size="4">
            {amount}
          </Text>
        </HStack>
        <HStack textAlign="right">
          <Text size="3">Sisa hari</Text>
          <Text as="strong" size="4">
            {deadline}
          </Text>
        </HStack>
      </Grid>
    </VStack>
  )
}

export default DonationCard
