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
} from '@chakra-ui/react'

import {NavFundraiser} from '@components/Nav'
import Footer from '@components/Footer'

export default function Create() {
  const formSubmit = (values) => {
    console.log(values)
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

      <Grid as="main" marginBlock="85px" gap="8">
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
            initialValues={{fundraisingName: ''}}
            validationSchema={Yup.object({
              fundraisingName: Yup.string().required(
                'Fundraising Name is Required',
              ),
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
                    <Input {...field} id="fundraisingName" />
                    <FormErrorMessage>
                      {form.errors.fundraisingName}
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
