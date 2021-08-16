import {Box, useRadio} from '@chakra-ui/react'

export default function RadioCard(props) {
  const {getInputProps, getCheckboxProps} = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        textAlign="center"
        boxShadow="md"
        _checked={{
          bg: 'green.600',
          color: 'white',
          borderColor: 'green.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}
