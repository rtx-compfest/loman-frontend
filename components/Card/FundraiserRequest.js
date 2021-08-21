import {Box, Grid, Heading, Tag, Text} from '@chakra-ui/react'

const DonationCard = ({
  name = 'fundraiser',
  email,
  case: status = 'Pending',
}) => {
  return (
    <Grid
      gap="3"
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="6"
      textAlign="left"
      height="fit-content"
    >
      {status != null && status !== '' ? (
        <Tag variant="solid" colorScheme="yellow" width="min-content">
          {status}
        </Tag>
      ) : (
        ''
      )}
      <Heading as="h4" size="md">
        {name}
      </Heading>
      <Box display="flex" gridGap="2" alignItems="center">
        <Text size="md" color="gray.700">
          {email}
        </Text>
      </Box>
    </Grid>
  )
}

export default DonationCard
