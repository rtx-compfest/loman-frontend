/**
 * Dashboard is a component for showing all the activities a user can see and varies between user role
 */

// props structure: (Donator)
// [
//  {
//    header: "Donor",
//    data: [
//      {
//        title: "Donasi untuk anak jalanan",
//        ...
//      }
//    ]
//  }
// ]
import NextLink from 'next/link'
import {Button, Grid, Heading, Link, VStack} from '@chakra-ui/react'
import {DonationCard} from '@components/Card'

const Dashboard = ({props}) => {
  return (
    <VStack>
      {props.map((section, i) => (
        <Grid key={i} gap="5" width="100%">
          <Grid
            autoFlow="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Heading as="h3" fontSize="xl">
              {section.header}
            </Heading>
            <Link as={NextLink} href={section.link} passHref={true}>
              <Button as="a" variant="outline" colorScheme="gray">
                See all {section.header.toLowerCase()}
              </Button>
            </Link>
          </Grid>

          <Grid
            templateColumns="repeat(auto-fill, minmax(280px, 1fr))"
            gap="10"
          >
            {section.data.length != 0
              ? section.data.map((data, j) => (
                  <DonationCard key={j} {...data} />
                ))
              : `No ${section.header} yet`}
          </Grid>
        </Grid>
      ))}
    </VStack>
  )
}

export default Dashboard
