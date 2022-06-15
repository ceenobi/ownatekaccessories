import React, { useEffect } from 'react'
import Link from 'next/link'
import { BsBagCheckFill } from 'react-icons/bs'
import {
  Box,
  Container,
  Icon,
  Flex,
  Heading,
  Text,
  LinkBox,
  LinkOverlay,
  Button,
} from '@chakra-ui/react'

import { useCart } from '../contextHook/useCart'
import { runFireworks } from '../lib/utils'

export default function success() {
  const { setBagItems } = useCart()

  useEffect(() => {
    localStorage.clear()
    setBagItems([])
    runFireworks()
  }, [])

  return (
    <Box mt='5rem' py={5}>
      <Container maxW='container.lg'>
        <Flex justify='center' align='center' direction='column' mt={4}>
          <Icon as={BsBagCheckFill} boxSize='60px' mb='3rem' />
          <Heading as='h2' size='xl'>
            Thank you for your order!
          </Heading>
          <Box mt={4} mb={10}>
            <Text textStyle='p' textAlign='center'>
              Please check your inbox for the receipt.
            </Text>
            <LinkBox title='email me'>
              <LinkOverlay href='mailto:order@ownatek.com' textStyle='p'>
                If you have any questions, please email{' '}
                <Box as='span' color='teal.400'>
                  order@ownatek.com
                </Box>
              </LinkOverlay>
            </LinkBox>
          </Box>
          <Link href='/'>
            <Button variant='with-shadow' size='xl'>
              CONTINUE SHOPPING
            </Button>
          </Link>
        </Flex>
      </Container>
    </Box>
  )
}
