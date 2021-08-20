import {useState} from 'react'
import Link from 'next/link'
import * as Yup from 'yup'
import {Formik, Field, Form} from 'formik'
import {
  Button,
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
import {useMutation} from 'react-query'

import {NavFundraiser} from '@components/Nav'
import {useAuthContext} from '@context/auth'
import {Layout} from '@components/Layout'
import {DonationCategoryList} from 'constant'
import {ProtectedRoute} from '@components/Route'

function Create() {
  const toast = useToast()
  const {userData, request, isAuthenticated} = useAuthContext()

  const [file, setFile] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const donationMutation = useMutation(['/donation_program'], (data) => {
    const formdata = new FormData()
    formdata.append('donation_name', data.fundraisingName)
    formdata.append('max_date', data.fundraisingDeadline)
    formdata.append('expected_amount', data.fundraisingTarget)
    formdata.append('user_id', userData.userId)
    formdata.append('donation_description', data.description)
    formdata.append('photos', data.file)
    formdata.append('recipient', data.benefitRecipients)
    formdata.append('donation_category', data.category)

    const options = {
      method: 'POST',
      body: formdata,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
      },
    }

    setIsSubmitting(true)

    return request(`/donation_program`, options)
      .then((result) => {
        toast({
          title: 'Create Donation Program Success',
          status: 'success',
          position: 'top',
          duration: 3000,
          isClosable: true,
        })
        queryCache.invalidateQueries(`/donation_program`)
        router.push('/fundraiser')
        setIsSubmitting(false)
        return result.data
      })
      .catch((err) => {
        console.error(err)
        toast({
          title: err.message,
          status: 'error',
          position: 'top',
          duration: 3000,
          isClosable: true,
        })
        setIsSubmitting(false)
        return err
      })
  })

  const formSubmit = (values) => {
    if (file == null) {
      toast({
        title: 'Photo is required',
        description:
          'Photo is required with the following types: .jpeg, .jpg, and .png',
        status: 'warning',
        position: 'top',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    values.file = file
    donationMutation.mutate(values)
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
    <Layout hasNavbar={false} title="Create Donation Program | Loman">
      {isAuthenticated() === 'fundraiser' ? (
        <header>
          <NavFundraiser />
        </header>
      ) : (
        ''
      )}

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
                .oneOf(
                  DonationCategoryList.map((category) =>
                    category.id.toString(),
                  ),
                )
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
                        {DonationCategoryList.map((category) => {
                          return (
                            <option key={category.id} value={category.id}>
                              {category.category}
                            </option>
                          )
                        })}
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
                        <InputLeftAddon>+62</InputLeftAddon>
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
                isLoading={isSubmitting}
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
    </Layout>
  )
}

export default function CreateFundraiserRoute() {
  return (
    <ProtectedRoute route="fundraiser">
      <Create />
    </ProtectedRoute>
  )
}
