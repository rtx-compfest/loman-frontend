import * as React from 'react'
import * as Yup from 'yup'
import NextLink from 'next/link'
import {useRouter} from 'next/router'
import {Field, Form, Formik} from 'formik'
import {
  Heading,
  useRadioGroup,
  Text,
  Grid,
  Link,
  Icon,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Checkbox,
  useToast,
} from '@chakra-ui/react'
import {ChevronLeftIcon} from '@heroicons/react/outline'

import {NavDonor} from '@components/Nav'
import {Layout} from '@components/Layout'
import {RadioCard} from '@components/Card'
import formatCurrency from '@lib/formatCurrency'
import {ProtectedRoute} from '@components/Route'
import {useAuthContext} from '@context/auth'
import {useQuery, useMutation, useQueryClient} from 'react-query'

export const Donate = () => {
  const amount = ['10000', '25000', '50000', '100000', '200000', '500000']

  const router = useRouter()
  const toast = useToast()
  const {userData, request} = useAuthContext()
  const queryCache = useQueryClient()

  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const {id} = router.query

  const donationQuery = useQuery(`/donation/${id}`, () => {
    const options = {
      method: 'GET',
    }

    return request(`/donation_program/${id}`, options)
      .then((result) => result.data)
      .catch((err) => {
        console.error(err.message)
      })
  })

  const donateMutation = useMutation(['/donate'], (data) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }

    setIsSubmitting(true)

    return request(`/wallet/donate/${id}`, options)
      .then((result) => {
        toast({
          title: 'Donate Success',
          status: 'success',
          position: 'top',
          duration: 3000,
          isClosable: true,
        })
        queryCache.invalidateQueries(`/donation/${id}`)
        router.push(`../${id}`)
        setIsSubmitting(false)
        return result.data
      })
      .catch((err) => {
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

  const {getRootProps, getRadioProps} = useRadioGroup({
    name: 'amount',
    defaultValue: '10000',
  })

  const group = getRootProps()

  const formSubmit = (value) => {
    const req = {
      userId: userData.userId,
      amount: parseInt(value.amount),
      notes: value.notes,
      isVisible: value.isAnonymous === false ? 1 : 0,
    }

    donateMutation.mutate(req)
  }

  return (
    <Layout hasNavbar={false}>
      <header>
        <NavDonor />
      </header>

      <Grid as="main" marginBlock="85px" placeItems="center">
        <Grid maxWidth="500px" width="100%">
          <Link as={NextLink} href={`../${id}`}>
            <a style={{width: 'fit-content', marginLeft: '20px'}}>
              <Grid
                autoFlow="column dense"
                gap="2"
                autoColumns="min-content max-content"
                alignItems="center"
                width="fit-content"
                pr="4"
                color="gray.600"
              >
                <Icon as={ChevronLeftIcon} />
                <Text>Back to detail donation</Text>
              </Grid>
            </a>
          </Link>
          {donationQuery.isLoading ? <div>Loading...</div> : ''}
          {donationQuery.isSuccess ? (
            <Grid gap="4" p={5} textAlign="left" height="fit-content">
              <Heading as="h2" size="lg">
                {donationQuery.data.donation_name}
              </Heading>
              <Formik
                initialValues={{
                  amount: '10000',
                  notes: '',
                  isAnonymous: false,
                }}
                validationSchema={Yup.object({
                  amount: Yup.string()
                    .oneOf(amount)
                    .required('Donation amount is Required'),
                  notes: Yup.string(),
                  isAnonymous: Yup.boolean(),
                })}
                onSubmit={formSubmit}
              >
                <Form>
                  <Field name="amount">
                    {({field, form}) => {
                      return (
                        <FormControl
                          id="amount"
                          isInvalid={
                            !!form.errors.amount && !!form.touched.amount
                          }
                        >
                          <FormLabel htmlFor="amount">
                            Enter the donation amount
                          </FormLabel>
                          <Grid
                            {...field}
                            {...group}
                            templateColumns="repeat(3, 1fr)"
                            gap="5"
                          >
                            {amount.map((value) => {
                              const radio = getRadioProps({value})

                              return (
                                <RadioCard key={value} {...radio}>
                                  {formatCurrency(value).slice(0, -3)}
                                </RadioCard>
                              )
                            })}
                          </Grid>
                          <FormErrorMessage>
                            {form.errors.amount}
                          </FormErrorMessage>
                        </FormControl>
                      )
                    }}
                  </Field>
                  <Field name="notes">
                    {({field, form}) => (
                      <FormControl
                        marginBlock="4"
                        isInvalid={form.errors.notes && form.touched.notes}
                      >
                        <FormLabel htmlFor="notes">
                          Pray in this donation (optional)
                        </FormLabel>
                        <Textarea
                          {...field}
                          id="notes"
                          resize="vertical"
                          placeholder="Hope you get well soon"
                        />
                        <FormErrorMessage>
                          {form.errors.notes}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="isAnonymous" type="checkbox">
                    {({field, form}) => (
                      <FormControl
                        marginBlock="4"
                        isInvalid={
                          form.errors.isAnonymous && form.touched.isAnonymous
                        }
                      >
                        <Checkbox
                          {...field}
                          colorScheme="green"
                          id="isAnonymous"
                        >
                          Hide my name
                        </Checkbox>
                        <FormErrorMessage>
                          {form.errors.isAnonymous}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    variant="solid"
                    colorScheme="green"
                    type="submit"
                    width="100%"
                    isLoading={isSubmitting}
                  >
                    Donate
                  </Button>
                </Form>
              </Formik>
            </Grid>
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    </Layout>
  )
}

export default function DonateRoute() {
  return (
    <ProtectedRoute route="donor">
      <Donate />
    </ProtectedRoute>
  )
}
