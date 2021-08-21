import * as React from 'react'
import {
  Box,
  Button,
  Grid,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import {useAuthContext} from '@context/auth'
import {useRouter} from 'next/router'
import {useMutation} from 'react-query'

import statusColor from '@lib/statusColor'
import statusText from '@lib/statusText'

const DonationCard = ({
  id,
  name = 'fundraiser',
  email,
  address,
  phone,
  status_user: status = 'Pending',
}) => {
  const toast = useToast()
  const router = useRouter()
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {request} = useAuthContext()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const initialRef = React.useRef()

  const fundraiserMutation = useMutation(['/user'], (data) => {
    const options = {
      method: 'PUT',
      body: JSON.stringify(data),
    }

    setIsSubmitting(true)

    return request(`/user/${id}`, options)
      .then((result) => {
        toast({
          title: 'Set status fundraiser is success',
          status: 'success',
          position: 'top',
          duration: 3000,
          isClosable: true,
        })
        router.push('/admin')
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

  const handleVerify = () => {
    fundraiserMutation.mutate({status_user: 1})
  }

  const handleReject = () => {
    fundraiserMutation.mutate({status_user: 0})
  }

  return (
    <>
      <Grid
        gap="3"
        p={5}
        shadow="md"
        borderWidth="1px"
        borderRadius="6"
        textAlign="left"
        height="fit-content"
        onClick={onOpen}
        cursor="pointer"
      >
        {status != null && status !== '' ? (
          <Tag
            variant="solid"
            colorScheme={statusColor(statusText(status))}
            width="min-content"
          >
            {statusText(status)}
          </Tag>
        ) : (
          ''
        )}
        <Heading as="h4" size="md">
          {name}
        </Heading>
        <Box display="flex" gridGap="2" alignItems="center">
          <Text size="md" color="gray.700">
            {email}
          </Text>
        </Box>
      </Grid>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Fundraiser Request</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Heading as="h3" fontSize="lg">
              {name}
            </Heading>
            <Text>Email: {email}</Text>
            <Text>Address: {address}</Text>
            <Text>Phone: {phone}</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={handleVerify}
              isLoading={isSubmitting}
            >
              Verify
            </Button>
            <Button
              variant="ghost"
              onClick={handleReject}
              isLoading={isSubmitting}
            >
              Reject
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DonationCard
