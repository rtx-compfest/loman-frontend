import {Layout} from '@components/layout'
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import Link from 'next/link'
import {useState} from 'react'
import Image from 'next/image'
import Logo from '../../public/loman.svg'

const DonatorSignUp = () => {
  const [show, setShow] = useState(false)

  return (
    <SimpleGrid columns={2} spacingX="2rem" spacingY="1.25rem">
      <Box>
        <Text>Name</Text>
        <Input />
      </Box>

      <Box>
        <Text>Password</Text>
        <InputGroup>
          <Input pr="4.5rem" type={show ? 'text' : 'password'} />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>

      <Box>
        <Text>Email</Text>
        <Input />
      </Box>

      <Box>
        <Text>Phone Number</Text>
        <InputGroup>
          <InputLeftAddon>+62</InputLeftAddon>
          <Input type="tel" />
        </InputGroup>
      </Box>
    </SimpleGrid>
  )
}

const FundraiserSignUp = () => {
  const [show, setShow] = useState(false)

  return (
    <Grid
      columns={2}
      templateColumns="repeat(2, 1fr)"
      columnGap="2rem"
      rowGap="1.25rem"
    >
      <GridItem>
        <Text>Name</Text>
        <Input />
      </GridItem>

      <GridItem>
        <Text>Password</Text>
        <InputGroup>
          <Input pr="4.5rem" type={show ? 'text' : 'password'} />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </GridItem>

      <GridItem>
        <Text>Social Media</Text>
        <Input />
      </GridItem>

      <GridItem>
        <Text>Email</Text>
        <Input />
      </GridItem>

      <GridItem>
        <Text>Job</Text>
        <Input />
      </GridItem>

      <GridItem>
        <Text>Organization</Text>
        <Input />
      </GridItem>

      <GridItem colSpan={2}>
        <Text>Address</Text>
        <Input />
      </GridItem>

      <GridItem colSpan={2}>
        <Text>About Yourself</Text>
        <Textarea />
      </GridItem>
    </Grid>
  )
}

const SignUp = () => {
  return (
    <Layout>
      <VStack
        align="stretch"
        spacing="2rem"
        boxShadow="md"
        borderRadius="0.5rem"
        px="1.5rem"
        py="2rem"
      >
        <Image src={Logo} alt="Loman logo" />

        <Heading>Sign Up</Heading>

        <Tabs variant="enclosed">
          <TabList>
            <Tab>Donor</Tab>
            <Tab>Fundraiser</Tab>
          </TabList>
          <TabPanels>
            <TabPanel px={0}>
              <DonatorSignUp />
            </TabPanel>
            <TabPanel px={0}>
              <FundraiserSignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Button colorScheme="green" w="full">
          Sign Up
        </Button>

        <Center alignSelf="stretch">
          <Text mr="0.5rem">Already have an account?</Text>
          <Link href="/sign-in">Sign In</Link>
        </Center>
      </VStack>
    </Layout>
  )
}

export default SignUp
