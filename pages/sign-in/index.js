import {Layout} from '@components/Layout'
import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from '@chakra-ui/react'
import Link from 'next/link'
import {useState} from 'react'
import Image from 'next/image'
import Logo from '../../public/loman.svg'

const SignIn = () => {
  const [show, setShow] = useState(false)

  return (
    <Layout hasNavbar={false} hasFooter={false}>
      <VStack
        boxShadow="md"
        borderRadius="0.5rem"
        px="1.5rem"
        py="2rem"
        align="stretch"
        spacing="2rem"
      >
        <Image src={Logo} alt="Loman logo" />

        <Heading>Sign In</Heading>

        <VStack spacing="1.25rem" align="stretch">
          <Box>
            <Text>Email</Text>
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
        </VStack>

        <Button colorScheme="green">Sign In</Button>

        <Center alignSelf="stretch">
          <Text mr="0.5rem">{"Doesn't have an account yet?"}</Text>
          <Link href={'/sign-up'}>Sign Up</Link>
        </Center>
      </VStack>
    </Layout>
  )
}

export default SignIn
