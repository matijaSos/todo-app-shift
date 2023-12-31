import {
  ChakraProvider,
  extendTheme,
  Box,
  HStack,
  Flex,
  Container,
  Button,
  Image
} from '@chakra-ui/react'
import { ReactNode } from 'react'

import useAuth from '@wasp/auth/useAuth'
import logout from '@wasp/auth/logout'

import armadaLogoUrl from '../images/armadaLogo.png'

const Navbar = () => {
  return (
    <Box bg='#1a1736'>
      <Container maxW={'container.lg'}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Image width='150px' src={armadaLogoUrl} />
          <Button onClick={() => logout()}>Logout</Button>
        </Flex>
      </Container>
    </Box>
  )
}

export default function App({ children }: { children: ReactNode }) {
  const { data: user } = useAuth()

  return (
    <ChakraProvider>
      <Box h='100vh'>
        {!!user && <Navbar />}
        {children}
      </Box>
    </ChakraProvider>
  )
}