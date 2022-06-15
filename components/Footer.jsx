import React from 'react'
import {
  Box,
  Container,
  HStack,
  Icon,
  Link as Route,
  Flex,
  Stack,
  Text,
  Image,
} from '@chakra-ui/react'
import {
  RiTwitterFill,
  RiInstagramFill,
  RiFacebookCircleFill,
  RiYoutubeFill,
} from 'react-icons/ri'
import Link from 'next/link'

export default function Footer() {
  const iconStyles = {
    boxSize: '30px',
    cursor: 'pointer',
    color: 'pallete.lightGold',
    _hover: { color: 'pallete.darkBg', transition: 'all 0.5s ease-in-out' },
  }

  return (
    <Box mt='5rem' py={3}>
      <Container maxW='container.lg'>
        <HStack spacing='40px' justify='center'>
          <Route href='https://twitter.com/' isExternal>
            <Icon as={RiTwitterFill} sx={iconStyles} />
          </Route>
          <Route href='https://instagram.com/' isExternal>
            <Icon as={RiInstagramFill} sx={iconStyles} />
          </Route>
          <Route href='https://facebook.com/' isExternal>
            <Icon as={RiFacebookCircleFill} sx={iconStyles} />
          </Route>
          <Route href='https://youtube.com/' isExternal>
            <Icon as={RiYoutubeFill} sx={iconStyles} />
          </Route>
        </HStack>

        <Stack
          direction='row'
          spacing='20px'
          justify='center'
          align='center'
          mt='3rem'
        >
          <Stack direction={{ base: 'column', md: 'row' }} spacing='20px'>
            <Link href='/help/data'>
              <Text textStyle='sm'>HELP & FAQ</Text>
            </Link>
            <Link href='/help/data'>
              <Text textStyle='sm'>PRIVACY POLICY</Text>
            </Link>
            <Link href='/help/data'>
              <Text textStyle='sm'>TERMS OF USE</Text>
            </Link>
          </Stack>
          <Stack direction={{ base: 'column', md: 'row' }} spacing='20px'>
            <Link href='/help/data'>
              <Text textStyle='sm'>SHIPING POLICY</Text>
            </Link>
            <Link href='/help/data'>
              <Text textStyle='sm'>REFUND POLICY</Text>
            </Link>
            <Link href='/help/data'>
              <Text textStyle='sm'>TERMS OF SERVICE</Text>
            </Link>
          </Stack>
        </Stack>

        <Flex
          justify='space-between'
          align='center'
          mt='3rem'
          direction={{ base: 'column', lg: 'row' }}
        >
          <Text textStyle='sm' mb={4} textAlign='center'>
            Copyright &copy;2022, OWNATEK Accessories. Powered by{' '}
            <a href='https://sanity.io'>Sanity</a>
          </Text>
          <HStack spacing='20px'>
            <Image
              src='https://cdn.liveagent.com/app/uploads/2020/11/stripe-logo.jpg'
              w='60px'
              h='30px'
              alt='image'
            />
            <Image
              src='https://imageio.forbes.com/blogs-images/mfonobongnsehe/files/2014/09/paypal.jpg?format=jpg&width=1200'
              w='60px'
              h='30px'
              alt='image'
            />
            <Image
              src='https://www.investsmall.co/wp-content/uploads/2020/11/paystack.png'
              w='60px'
              h='30px'
              alt='image'
            />
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}
