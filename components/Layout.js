import {Container} from '@chakra-ui/react'
import Footer from '@components/Footer'

export const Layout = ({children}) => (
  <Container>
    {children}
    <Footer />
  </Container>
)
