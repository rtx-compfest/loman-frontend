import {useState} from 'react'
import Link from 'next/link'
import Head from 'next/head'
import * as Yup from 'yup'
import {Formik, Field, Form} from 'formik'
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Textarea,
  useToast,
} from '@chakra-ui/react'

import {NavFundraiser} from '@components/Nav'
import Footer from '@components/Footer'

export default function Create() {
  const toast = useToast()
  const [file, setFile] = useState(null)

  const formSubmit = (values) => {
    if (file != null) {
      values.file = file
    } else {
      toast({
        title: 'Photo is required',
        description:
          'Photo is required with the following types: .jpeg, .jpg, and .png',
        status: 'warning',
        position: 'top',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleFile = (files) => {
    const FILE_TYPES = ['image/jpg', 'image/jpeg', 'image/png']

    if (files == null) {
      toast({
        title: 'Photo is required',
        description:
          'Photo is required with the following types: .jpeg, .jpg, and .png',
        status: 'warning',
        position: 'top',
        duration: 3000,
        isClosable: true,
      })
      setFile(null)
      return
    }

    if (!FILE_TYPES.includes(files?.type)) {
      toast({
        title: 'File types is invalid',
        description:
          'Photo is required with the following types: .jpeg, .jpg, and .png',
        status: 'warning',
        position: 'top',
        duration: 3000,
        isClosable: true,
      })
      setFile(null)
      return
    }

    setFile(files)
  }

  return (
    <Container maxWidth="container.lg">
      <Head>
        <title>Create Donation Program | Loman | Fundraiser</title>
        <meta name="description" content="Fundraiser" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <NavFundraiser />
      </header>

      <Grid as="main" marginBlock="85px" gap="8" placeItems="center">
        <Grid
          maxWidth="720px"
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="6"
        >
          <Heading size="xl" mb="5">
            New Fundraising
          </Heading>
          <Formik
            initialValues={{
              fundraisingName: '',
              category: '',
              fundraisingTarget: '',
              benefitRecipients: '',
              fundraisingDeadline: '',
              phoneNumber: '',
              description: '',
            }}
            validationSchema={Yup.object({
              fundraisingName: Yup.string().required(
                'Fundraising Name is Required',
              ),
              category: Yup.string()
                .oneOf(['Karya Kreatif & Modal Usaha'])
                .required('Category is Required'),
              fundraisingTarget: Yup.number().required(
                'Fundraising Target is Required',
              ),
              benefitRecipients: Yup.string().required(
                'Benefit Recipients Name is Required',
              ),
              fundraisingDeadline: Yup.date().required(),
              phoneNumber: Yup.number().required('Phone Number is required'),
              description: Yup.string().required('Description is required'),
            })}
            onSubmit={formSubmit}
          >
            <Form>
              <Field name="fundraisingName" type="text">
                {({field, form}) => (
                  <FormControl
                    marginBlock="4"
                    isInvalid={
                      form.errors.fundraisingName &&
                      form.touched.fundraisingName
                    }
                  >
                    <FormLabel htmlFor="fundraisingName">
                      Fundraising Name
                    </FormLabel>
                    <Input
                      {...field}
                      id="fundraisingName"
                      placeholder="Enter Fundraising Name"
                    />
                    <FormErrorMessage>
                      {form.errors.fundraisingName}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Grid templateColumns="repeat(2, 1fr)" gap="5">
                <Field name="category" type="select">
                  {({field, form}) => (
                    <FormControl
                      marginBlock="4"
                      isInvalid={
                        form.errors.category && form.touched.category
                      }
                    >
                      <FormLabel htmlFor="category">Category</FormLabel>
                      <Select
                        {...field}
                        id="category"
                        placeholder="Select an category"
                      >
                        <option value="Karya Kreatif & Modal Usaha">
                          Karya Kreatif & Modal Usaha
                        </option>
                      </Select>
                      <FormErrorMessage>
                        {form.errors.category}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="fundraisingTarget" type="number">
                  {({field, form}) => (
                    <FormControl
                      marginBlock="4"
                      isInvalid={
                        form.errors.fundraisingTarget &&
                        form.touched.fundraisingTarget
                      }
                    >
                      <FormLabel htmlFor="fundraisingTarget">
                        Fundraising Target
                      </FormLabel>
                      <InputGroup>
                        <InputLeftAddon>Rp</InputLeftAddon>
                        <Input
                          {...field}
                          id="fundraisingTarget"
                          placeholder="Enter amount"
                          type="number"
                        />
                      </InputGroup>
                      <FormErrorMessage>
                        {form.errors.fundraisingTarget}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Grid>
              <Grid templateColumns="repeat(2, 1fr)" gap="5">
                <Field name="benefitRecipients" type="text">
                  {({field, form}) => (
                    <FormControl
                      marginBlock="4"
                      isInvalid={
                        form.errors.benefitRecipients &&
                        form.touched.benefitRecipients
                      }
                    >
                      <FormLabel htmlFor="benefitRecipients">
                        Benefit Recipients
                      </FormLabel>
                      <Input
                        {...field}
                        id="benefitRecipients"
                        placeholder="Recipient Name"
                      />
                      <FormErrorMessage>
                        {form.errors.benefitRecipients}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="fundraisingDeadline" type="date">
                  {({field, form}) => (
                    <FormControl
                      marginBlock="4"
                      isInvalid={
                        form.errors.fundraisingDeadline &&
                        form.touched.fundraisingDeadline
                      }
                    >
                      <FormLabel htmlFor="fundraisingDeadline">
                        Fundraising Deadline
                      </FormLabel>
                      <InputGroup>
                        <Input
                          {...field}
                          id="fundraisingDeadline"
                          type="date"
                        />
                      </InputGroup>
                      <FormErrorMessage>
                        {form.errors.fundraisingDeadline}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Grid>
              <Grid templateColumns="repeat(2, 1fr)" gap="5">
                <Field name="photo" type="file">
                  {({field, form}) => (
                    <FormControl
                      marginBlock="4"
                      isInvalid={form.errors.photo && form.touched.photo}
                    >
                      <FormLabel htmlFor="photo">Photo</FormLabel>
                      <Input
                        {...field}
                        id="photo"
                        type="file"
                        paddingBlock="4px"
                        onChange={(event) => {
                          handleFile(event.target.files[0])
                        }}
                      />
                      <FormErrorMessage>{form.errors.photo}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="phoneNumber" type="text">
                  {({field, form}) => (
                    <FormControl
                      marginBlock="4"
                      isInvalid={
                        form.errors.phoneNumber && form.touched.phoneNumber
                      }
                    >
                      <FormLabel htmlFor="phoneNumber">
                        Phone Number
                      </FormLabel>
                      <InputGroup>
                        <InputLeftAddon
                          // eslint-disable-next-line react/no-children-prop
                          children="+62"
                        />
                        <Input
                          {...field}
                          id="phoneNumber"
                          placeholder="Enter your phone number"
                          type="number"
                        />
                      </InputGroup>
                      <FormErrorMessage>
                        {form.errors.phoneNumber}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Grid>
              <Field name="description" type="text">
                {({field, form}) => (
                  <FormControl
                    marginBlock="4"
                    isInvalid={
                      form.errors.description && form.touched.description
                    }
                  >
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Textarea {...field} id="description" resize="vertical" />
                    <FormErrorMessage>
                      {form.errors.description}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                type="submit"
                variant="solid"
                colorScheme="green"
                width="100%"
              >
                Create New Fundraising
              </Button>
              <Link href="/fundraiser" passHref={true}>
                <Button
                  as="a"
                  variant="outline"
                  mt="5"
                  colorScheme="red"
                  width="100%"
                >
                  Cancel Fundraising
                </Button>
              </Link>
            </Form>
          </Formik>
        </Grid>
      </Grid>

      <footer>
        <Footer />
      </footer>
    </Container>
  )
}
