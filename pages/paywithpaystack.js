import React, {useState} from 'react'
import {
  Box,
  Container,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Flex, Button
} from '@chakra-ui/react'
import { PaystackButton, usePaystackPayment } from 'react-paystack'

import { useCart } from '../contextHook/useCart'

export default function PaystackPayment() {
  const [email, setEmail] = useState('')
  const { priceSum } = useCart()

  const config = {
    reference: new Date().getTime().toString(),
    email: '',
    amount: priceSum * 100,
    publicKey: 'pk_test_ec591c07737bc4b4b50c2f5e31eab986bfaa5e3f',
  }
  const onSuccess = (transaction) => {
    let message = `transaction complete! Reference ${transaction.reference}`
    alert(message)
  }
  const onClose = () => {
    alert('You have canceled')
  }

  const initializePayment = usePaystackPayment(config)

  // const publicKey = 'pk_test_ec591c07737bc4b4b50c2f5e31eab986bfaa5e3f'
  // const amount = priceSum * 100

  // const componentProps = {
  //   email,
  //   amount,
  //   publicKey,
  //   text: 'PAY WITH PAYSTACK',
  //   onSuccess(transaction) {
  //     let message = `transaction complete! Reference ${transaction.reference}`
  //     alert(message)
  //   },
  //   onClose() {
  //     toast.error('You have canceled this transaction')
  //   },
  // }

  const handleInputChange = (e) => setEmail(e.target.value)

  const isError = email === ''
  return (
    <Box mt='5rem' py={5}>
      <Container maxW='container.lg'>
        <Flex
          direction='column'
          justify='center'
          w={{ base: 'full', sm: '300px', lg: '400px' }}
          m='auto'
        >
          <form>
            <FormControl isInvalid={isError} isRequired mb={6}>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <Input
                id='email'
                type='email'
                value={email}
                onChange={handleInputChange}
              />
              {!isError ? (
                <FormHelperText>
                  Enter the email you'd like to receive the newsletter on.
                </FormHelperText>
              ) : (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
            </FormControl>
            <Button
              variant='with-shadow'
              size='xl'
              w='100%'
              type='submit'
              onClick={() => {
                initializePayment(onSuccess, onClose)
              }}
            >
              PAY &#8358;{priceSum}
            </Button>
            {/* <Button variant='with-shadow' size='xl' w='100%' type='submit'>
              <PaystackButton {...componentProps} />
            </Button> */}
          </form>
        </Flex>
      </Container>
    </Box>
  )
}
