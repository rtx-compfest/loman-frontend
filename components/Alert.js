import * as React from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'

export default function Alert({
  title,
  isOpen,
  onClose,
  onClick: handleClick,
  alert = 'Reject',
}) {
  const cancelRef = React.useRef()

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {alert} {title}
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure want to {alert.toLowerCase()} this{' '}
            {title.toLowerCase()}?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme={alert === 'Reject' ? 'red' : 'green'}
              onClick={handleClick}
              ml={3}
            >
              {alert}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
