import * as Yup from 'yup'
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import {useState} from 'react'
import Image from 'next/image'
import {Field, Form, Formik} from 'formik'
import {useMutation} from 'react-query'
import {useRouter} from 'next/router'

import {Layout} from '@components/Layout'
import {useAuthContext} from '@context/auth'
import Logo from '../../public/loman.svg'

const DonorSignUp = () => {
  const {signUp} = useAuthContext()
  const toast = useToast()
  const router = useRouter()

  const [show, setShow] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const mutation = useMutation(['/register'], (data) => {
    setIsSubmitting(true)

    return signUp(data)
      .then((result) => {
        toast({
          title: 'Sign up success!',
          description: 'Sign up success, redirecting to Sign In page',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })

        setIsSubmitting(false)
        router.push('/sign-in')

        return result.data
      })
      .catch((err) => {
        toast({
          title: err.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        setIsSubmitting(false)
        return err
      })
  })

  const formSubmit = (value) => {
    value.phone = '0' + value.phone
    const data = {...value, user_roles: 2}
    mutation.mutate(data)
  }

  return (
    <Formik
      initialValues={{
        name: '',
        password: '',
        email: '',
        phone: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('Name is Required'),
        password: Yup.string().required('Password is required'),
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        phone: Yup.number('Phone number must be number').required(
          'Phone number is required',
        ),
      })}
      onSubmit={formSubmit}
    >
      <Form>
        <Grid templateColumns="repeat(2, 1fr)" gap="5">
          <Field name="name" type="text">
            {({field, form}) => (
              <FormControl
                marginBlock="4"
                isInvalid={form.errors.name && form.touched.name}
              >
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input {...field} id="name" placeholder="Name" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="password" type="password">
            {({field, form}) => (
              <FormControl
                marginBlock="4"
                isInvalid={form.errors.password && form.touched.password}
              >
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Input
                    {...field}
                    pr="4.5rem"
                    id="password"
                    type={show ? 'text' : 'password'}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShow(!show)}
                    >
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
        </Grid>
        <Grid templateColumns="repeat(2, 1fr)" gap="5">
          <Field name="email" type="email">
            {({field, form}) => (
              <FormControl
                marginBlock="4"
                isInvalid={form.errors.email && form.touched.email}
              >
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  {...field}
                  id="email"
                  placeholder="Email"
                  type="email"
                />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="phone" type="tel">
            {({field, form}) => (
              <FormControl
                marginBlock="4"
                isInvalid={form.errors.phone && form.touched.phone}
              >
                <FormLabel htmlFor="phone">Phone Number</FormLabel>
                <InputGroup>
                  <InputLeftAddon>+62</InputLeftAddon>
                  <Input {...field} type="tel" id="phone" />
                </InputGroup>
                <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
        </Grid>
        <Button
          type="submit"
          variant="solid"
          colorScheme="green"
          isLoading={isSubmitting}
          width="100%"
          marginBlock="4"
        >
          Sign Up
        </Button>

        <Center alignSelf="stretch">
          <Text mr="0.5rem">Already have an account?</Text>
          <Link as={NextLink} href="/sign-in">
            <a>
              <Text color="green">Sign In</Text>
            </a>
          </Link>
        </Center>
      </Form>
    </Formik>
  )
}

const FundraiserSignUp = () => {
  const {signUp, isAuthenticated} = useAuthContext()
  const toast = useToast()
  const router = useRouter()

  const [show, setShow] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const mutation = useMutation(['/register'], (data) => {
    setIsSubmitting(true)

    return signUp(data)
      .then((result) => {
        toast({
          title: 'Sign up success!',
          description: 'Sign up success, redirecting to Sign In page',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })

        setIsSubmitting(false)
        router.push('/sign-in')

        return result.data
      })
      .catch((err) => {
        toast({
          title: err.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        setIsSubmitting(false)
        return err
      })
  })

  const formSubmit = (value) => {
    const {
      fundraiserName,
      fundraiserEmail,
      fundraiserPassword,
      fundraiserPhoneNumber,
      socialMedia,
      ...rest
    } = value

    const data = {
      name: fundraiserName,
      email: fundraiserEmail,
      password: fundraiserPassword,
      phone: fundraiserPhoneNumber,
      socialmedia: socialMedia,
      ...rest,
      user_roles: 3,
    }

    mutation.mutate(data)
  }

  if (isAuthenticated() === 'donor') {
    router.push('/')
  } else if (isAuthenticated() === 'admin') {
    router.push('/admin')
  } else if (isAuthenticated() === 'fundraiser') {
    router.push('/fundraiser')
  }

  return (
    <Formik
      initialValues={{
        fundraiserName: '',
        fundraiserPassword: '',
        fundraiserEmail: '',
        fundraiserPhoneNumber: '',
        job: '',
        socialMedia: '',
        institution: '',
        address: '',
        about: '',
      }}
      validationSchema={Yup.object({
        fundraiserName: Yup.string().required('Name is Required'),
        fundraiserPassword: Yup.string().required('Password is required'),
        fundraiserEmail: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        fundraiserPhoneNumber: Yup.number(
          'Phone number must be number',
        ).required('Phone number is required'),
        job: Yup.string().required('Job is required'),
        socialMedia: Yup.string(),
        institution: Yup.string(),
        address: Yup.string().required('Address is required'),
        about: Yup.string().required('About Yourself is required'),
      })}
      onSubmit={formSubmit}
    >
      <Form>
        <Grid templateColumns="repeat(2, 1fr)" gap="5">
          <Field name="fundraiserName" type="text">
            {({field, form}) => (
              <FormControl
                marginBlock="4"
                isInvalid={
                  form.errors.fundraiserName && form.touched.fundraiserName
                }
              >
                <FormLabel htmlFor="fundraiserName">Name</FormLabel>
                <Input {...field} id="fundraiserName" placeholder="Name" />
                <FormErrorMessage>
                  {form.errors.fundraiserName}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="fundraiserPassword" type="password">
            {({field, form}) => (
              <FormControl
                marginBlock="4"
                isInvalid={
                  form.errors.fundraiserPassword &&
                  form.touched.fundraiserPassword
                }
              >
                <FormLabel htmlFor="fundraiserPassword">Password</FormLabel>
                <InputGroup>
                  <Input
                    {...field}
                    pr="4.5rem"
                    id="fundraiserPassword"
                    type={show ? 'text' : 'password'}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShow(!show)}
                    >
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {form.errors.fundraiserPassword}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
        </Grid>
        <Grid templateColumns="repeat(2, 1fr)" gap="5">
          <Field name="fundraiserEmail" type="email">
            {({field, form}) => (
              <FormControl
                marginBlock="4"
                isInvalid={
                  form.errors.fundraiserEmail && form.touched.fundraiserEmail
                }
              >
                <FormLabel htmlFor="fundraiserEmail">Email</FormLabel>
                <Input
                  {...field}
                  id="fundraiserEmail"
                  placeholder="Email"
                  type="email"
                />
                <FormErrorMessage>
                  {form.errors.fundraiserEmail}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="fundraiserPhoneNumber" type="tel">
            {({field, form}) => (
              <FormControl
                marginBlock="4"
                isInvalid={
                  form.errors.fundraiserPhoneNumber &&
                  form.touched.fundraiserPhoneNumber
                }
              >
                <FormLabel htmlFor="fundraiserPhoneNumber">
                  Phone Number
                </FormLabel>
                <InputGroup>
                  <InputLeftAddon>+62</InputLeftAddon>
                  <Input {...field} type="tel" id="fundraiserPhoneNumber" />
                </InputGroup>
                <FormErrorMessage>
                  {form.errors.fundraiserPhoneNumber}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
        </Grid>
        <Grid templateColumns="repeat(2, 1fr)" gap="5">
          <Field name="job">
            {({field, form}) => (
              <FormControl
                marginBlock="4"
                isInvalid={form.errors.job && form.touched.job}
              >
                <FormLabel htmlFor="job">Job</FormLabel>
                <Input {...field} id="job" placeholder="Mahasiswa" />
                <FormErrorMessage>{form.errors.job}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="socialMedia">
            {({field, form}) => (
              <FormControl
                marginBlock="4"
                isInvalid={
                  form.errors.socialMedia && form.touched.socialMedia
                }
              >
                <FormLabel htmlFor="socialMedia">Social Media</FormLabel>
                <Input {...field} id="socialMedia" placeholder="@compfest" />
                <FormErrorMessage>{form.errors.socialMedia}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
        </Grid>
        <Grid templateColumns="repeat(2, 1fr)" gap="5">
          <Field name="institution">
            {({field, form}) => (
              <FormControl
                marginBlock="4"
                isInvalid={
                  form.errors.institution && form.touched.institution
                }
              >
                <FormLabel htmlFor="institution">
                  Organization/Institution
                </FormLabel>
                <Input
                  {...field}
                  id="institution"
                  placeholder="PT. Karya Anak Bangsa"
                />
                <FormErrorMessage>{form.errors.institution}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="address">
            {({field, form}) => (
              <FormControl
                marginBlock="4"
                isInvalid={form.errors.address && form.touched.address}
              >
                <FormLabel htmlFor="address">Address</FormLabel>
                <Input
                  {...field}
                  id="address"
                  placeholder="Jl. Margonda Raya"
                />
                <FormErrorMessage>{form.errors.address}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
        </Grid>
        <Field name="about" type="text">
          {({field, form}) => (
            <FormControl
              marginBlock="4"
              isInvalid={form.errors.about && form.touched.about}
            >
              <FormLabel htmlFor="about">About</FormLabel>
              <Textarea {...field} id="about" resize="vertical" />
              <FormErrorMessage>{form.errors.about}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Button
          type="submit"
          variant="solid"
          colorScheme="green"
          width="100%"
          isLoading={isSubmitting}
          marginBlock="4"
        >
          Sign Up
        </Button>

        <Center alignSelf="stretch">
          <Text mr="0.5rem">Already have an account?</Text>
          <Link as={NextLink} href="/sign-in">
            <a>
              <Text color="green">Sign In</Text>
            </a>
          </Link>
        </Center>
      </Form>
    </Formik>
  )
}

const SignUp = () => {
  return (
    <Layout hasNavbar={false} hasFooter={false}>
      <Grid as="main" placeItems="center" minHeight="100vh">
        <Grid marginBlock="85px" maxWidth="615px">
          <VStack
            align="stretch"
            spacing="2rem"
            boxShadow="md"
            borderRadius="0.5rem"
            px="1.5rem"
            py="2rem"
          >
            <Box display="flex" justifyContent="flex-start">
              <Image src={Logo} alt="Loman logo" />
            </Box>

            <Heading>Sign Up</Heading>

            <Tabs variant="enclosed">
              <TabList>
                <Tab>Donor</Tab>
                <Tab>Fundraiser</Tab>
              </TabList>
              <TabPanels>
                <TabPanel px={0}>
                  <DonorSignUp />
                </TabPanel>
                <TabPanel px={0}>
                  <FundraiserSignUp />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default SignUp
