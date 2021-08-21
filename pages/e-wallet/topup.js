import * as React from 'react'
import * as Yup from 'yup'
import {Field, Form, Formik} from 'formik'
import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Text,
  Textarea,
  useRadioGroup,
  useToast,
} from '@chakra-ui/react'
import {useMutation, useQueryClient} from 'react-query'

import {Layout} from '@components/Layout'
import {NavDonor} from '@components/Nav'
import {RadioCard} from '@components/Card'
import formatCurrency from '@lib/formatCurrency'
import {amount, payment} from 'constant'
import {useAuthContext} from '@context/auth'
import {useRouter} from 'next/router'

const TopUp = () => {
  const toast = useToast()
  const router = useRouter()
  const queryCache = useQueryClient()
  const {userData, request} = useAuthContext()

  const [amounts, setAmounts] = React.useState('')
  const [payments, setPayments] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const topUpMutation = useMutation(['/topup'], (data) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }

    setIsSubmitting(true)

    return request(`/wallet/topup`, options)
      .then((result) => {
        toast({
          title: 'Top Up Success',
          status: 'success',
          position: 'top',
          duration: 3000,
          isClosable: true,
        })
        queryCache.invalidateQueries(`/user/${userData?.userId}`)
        router.push('/e-wallet')
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

  const amountRadio = useRadioGroup({
    name: 'amount',
    onChange: (value) => {
      setAmounts(value)
    },
  })

  const paymentRadio = useRadioGroup({
    name: 'payment',
    onChange: (value) => {
      setPayments(value)
    },
  })

  const amountGroup = amountRadio.getRootProps()
  const paymentGroup = paymentRadio.getRootProps()

  const formSubmit = (value) => {
    const req = {
      userId: userData.userId,
      amount: parseInt(value.amount),
      notes: value.notes,
    }

    topUpMutation.mutate(req)
  }

  return (
    <Layout hasNavbar={false}>
      <header>
        <NavDonor />
      </header>

      <Grid as="main" marginBlock="85px" placeItems="center">
        <Grid maxWidth="500px" width="100%">
          <Grid gap="4" p={5} textAlign="left" height="fit-content">
            <Heading as="h2" size="lg">
              Top Up
            </Heading>
            <Formik
              initialValues={{
                amount: '10000',
                payment: '',
                notes: '',
              }}
              validationSchema={Yup.object({
                amount: Yup.string()
                  .oneOf(amount)
                  .required('Top up amount is Required'),
                payment: Yup.string()
                  .oneOf(payment)
                  .required('Top up amount is Required'),
                notes: Yup.string(),
              })}
              onSubmit={formSubmit}
            >
              <Form>
                <Grid gap="7">
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
                            Select the donation amount
                          </FormLabel>
                          <Grid
                            {...field}
                            {...amountGroup}
                            templateColumns="repeat(3, 1fr)"
                            gap="5"
                          >
                            {amount.map((value) => {
                              const radio = amountRadio.getRadioProps({value})

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

                  <Field name="payment">
                    {({field, form}) => {
                      return (
                        <FormControl
                          id="payment"
                          isInvalid={
                            !!form.errors.payment && !!form.touched.payment
                          }
                        >
                          <FormLabel htmlFor="payment">
                            Select the payment method
                          </FormLabel>
                          <Grid
                            {...field}
                            {...paymentGroup}
                            templateColumns="repeat(3, 1fr)"
                            gap="5"
                          >
                            {payment.map((value) => {
                              const radio = paymentRadio.getRadioProps({
                                value,
                              })

                              return (
                                <RadioCard key={value} {...radio}>
                                  {value}
                                </RadioCard>
                              )
                            })}
                          </Grid>
                          <FormErrorMessage>
                            {form.errors.payment}
                          </FormErrorMessage>
                        </FormControl>
                      )
                    }}
                  </Field>

                  <Field name="notes">
                    {({field, form}) => (
                      <FormControl
                        isInvalid={form.errors.notes && form.touched.notes}
                      >
                        <FormLabel htmlFor="notes">Notes</FormLabel>
                        <Textarea {...field} id="notes" resize="vertical" />
                        <FormErrorMessage>
                          {form.errors.notes}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Divider />

                  <Grid
                    autoFlow="column"
                    alignItems="self-end"
                    justifyContent="space-between"
                  >
                    <Grid gap="2">
                      <Text>
                        Total:{' '}
                        <Text as="strong" fontSize="lg">
                          {amounts}
                        </Text>
                      </Text>
                      <Text>
                        Payment method:{' '}
                        <Text as="strong" fontSize="lg">
                          {payments}
                        </Text>
                      </Text>
                    </Grid>
                    <Button
                      variant="solid"
                      colorScheme="green"
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      Top Up
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default TopUp
