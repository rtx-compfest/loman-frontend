import * as React from 'react'
import * as Yup from 'yup'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import {Field, Form, Formik} from 'formik'
import {useMutation} from 'react-query'
import {useAuthContext} from '@context/auth'
import {useRouter} from 'next/router'

export default function Withdraw({id, isOpen, onClose}) {
  const {request} = useAuthContext()
  const router = useRouter()
  const toast = useToast()

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const initialRef = React.useRef()

  const withdrawMutation = useMutation(['/withdraw'], (data) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }

    setIsSubmitting(true)

    return request(`/wallet/withdraw/${id}`, options)
      .then((result) => {
        toast({
          title: 'Withdraw Request Success',
          status: 'success',
          position: 'top',
          duration: 3000,
          isClosable: true,
        })
        router.push('/fundraiser')
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

  const formSubmit = (data) => {
    console.log('withdraw')
    withdrawMutation.mutate(data)
  }

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Withdraw Request</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Formik
            initialValues={{
              notes: '',
            }}
            validationSchema={Yup.object({
              notes: Yup.string().required('Notes is Required'),
            })}
            onSubmit={formSubmit}
          >
            <Form>
              <Field name="notes" type="text">
                {({field, form}) => (
                  <FormControl
                    marginBlock="4"
                    isInvalid={form.errors.notes && form.touched.notes}
                  >
                    <FormLabel htmlFor="notes">Notes</FormLabel>
                    <Textarea
                      {...field}
                      ref={initialRef}
                      id="notes"
                      placeholder="Rancangan pengeluaran: "
                    />
                    <FormErrorMessage>{form.errors.notes}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                colorScheme="blue"
                mr={3}
                type="submit"
                isLoading={isSubmitting}
              >
                Send Request
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </Form>
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
