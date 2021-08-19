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
import {Grid, GridItem, Text, VStack} from '@chakra-ui/react'
import {DonationCard} from '@components/Card'

const Dashboard = ({props}) => {
  return (
    <VStack>
      {props.map((section, i) => (
        <Grid key={i} templateColumns="1fr 1fr" templateRows="1fr 1fr">
          <GridItem>
            <Text>{section.header}</Text>
          </GridItem>

          <GridItem>
            <Text>See all {section.header.toLowerCase()}</Text>
          </GridItem>

          <GridItem>
            {section.data.map((data, j) => (
              <DonationCard key={j} {...data} />
            ))}
          </GridItem>
        </Grid>
      ))}
    </VStack>
  )
}

export default Dashboard
