import React, { useRef } from 'react'
import Link from 'next/link'
import { RiShoppingCartLine } from 'react-icons/ri'
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineClose,
} from 'react-icons/ai'
import toast from 'react-hot-toast'
import {
  Box,
  Button,
  Icon,
  VStack,
  HStack,
  Flex,
  Spacer,
  Text,
  Divider,
  Image,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react'
//import { useRouter } from 'next/router'

import { useCart } from '../contextHook/useCart'
import getStripe from '../lib/getStripe'
//import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'

export default function Cart() {
  const bagRef = useRef()
  // const router = useRouter()
  const bg = useColorModeValue('pallete.darkBg', 'pallete.shellWhite')
  const { setShowBag, bagItems, updateBag, handleRemove, priceSum } = useCart()
  //const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()

  const boxStyle = {
    w: '100vw',
    position: 'fixed',
    right: '0',
    top: '0',
    zIndex: 100,
    transition: 'all 1s ease',
    background: 'rgba(0, 0, 0, 0.25)',
  }
  const innerBoxStyle = {
    h: '100vh',
    w: { base: 'full', lg: '480px' },
    float: 'right',
    position: 'relative',
    p: '20px 20px',
  }
  const buttonStyle = {
    border: '1px solid #c2a083',
    bg: 'pallete.lightGold',
    _hover: {
      bg: 'pallete.darkBg',
      color: 'pallete.lightGold',
    },
  }
  const close = () => setShowBag(false)

  const handleCheckout = async () => {
    const stripe = await getStripe()

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bagItems),
    })
    if (response.statusCode === 500) return

    const data = await response.json()

    toast.loading('Redirecting...')

    stripe.redirectToCheckout({ sessionId: data.id })
  }

  // useEffect(() => {
  //   if (!bagItems) {
  //     return router.push('/index')
  //   } else {
  //     const addPayPalScript = async () => {
  //       const { data: clientId } = await fetch('/api/paypal')
  //       paypalDispatch({
  //         type: 'resetOptions',
  //         value: { 'client-id': clientId, currency: 'USD' },
  //       })
  //       paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
  //     }
  //     addPayPalScript()
  //   }
  // }, [paypalDispatch])

  // const createOrder = (data, actions) => {
  //   return actions.order
  //     .create({
  //       intent: 'CAPTURE',
  //       purchase_units: [
  //         {
  //           description: 'Pay purchase',
  //           amount: {
  //             currency_code: 'USD',
  //             value: priceSum,
  //           },
  //         },
  //       ],
  //     })
  //     .then((orderID) => {
  //       setOrderID(orderID)
  //       return orderID
  //     })
  // }

  // const onApprove = async (data, actions) => {
  //    const order = await actions.order.capture()
  //     setSuccess(true)
  //     console.log(order)
  //   }
  // const onError = (data, actions) => {
  //   toast.error('Something went wrong with your payment')
  // }

  return (
    <Box sx={boxStyle} ref={bagRef}>
      <Box sx={innerBoxStyle} bg={bg}>
        <Flex justify='space-between'>
          <Flex flex='1'>
            <Icon
              color='pallete.lightGold'
              aria-label='close modal'
              as={AiOutlineLeft}
              onClick={() => setShowBag(false)}
              boxSize='40px'
              cursor='pointer'
            />
          </Flex>
          <VStack spacing='5px'>
            <Box position='relative'>
              <Icon
                as={RiShoppingCartLine}
                boxSize='40px'
                color='pallete.lightGold'
              />
              <Text position='absolute' right='15px' top='8px'>
                {bagItems.length}
              </Text>
            </Box>
          </VStack>
          <Spacer />
        </Flex>
        <Text textStyle='sm' textAlign='center' mb={2}>
          Delivery fee may differ depending on final purchase
        </Text>
        <Divider borderBottom='8px solid #c2a083' />
        {bagItems.length < 1 && (
          <Box textAlign='center' mt='2rem'>
            <Text textStyle='p' mb={6} fontWeight='bold'>
              Your Bag is Empty
            </Text>
            <VStack spacing='15px'>
              <Link href='/earbuds'>
                <Button size='xl' sx={buttonStyle} onClick={close}>
                  SHOP EARBUDS
                </Button>
              </Link>
              <Link href='/smartwatch'>
                <Button size='xl' sx={buttonStyle} onClick={close}>
                  SHOP SMARTWATCH
                </Button>
              </Link>
              <Link href='/speakers'>
                <Button size='xl' sx={buttonStyle} onClick={close}>
                  SHOP SPEAKERS
                </Button>
              </Link>
            </VStack>
          </Box>
        )}
        <Box mt='2rem'>
          {bagItems.length >= 1 &&
            bagItems.map((item) => (
              <Flex justify='space-between' key={item._id} mb={4}>
                <HStack spacing='30px'>
                  <Link href={`/product/${item.slug.current}`}>
                    <Box boxSize='100px' bg='pallete.lightGrey' onClick={close}>
                      <Image
                        src={item?.image[0].urlField}
                        boxSize='100%'
                        objectFit='contain'
                        alt={item.name}
                        cursor='pointer'
                      />
                    </Box>
                  </Link>
                  <Box>
                    <Box mb={2}>
                      <Heading as='h2' size='md'>
                        {item.name}
                      </Heading>
                      <Text textStyle='sm'>{item.category}</Text>
                    </Box>
                    <Flex justify='flex-start' align='center'>
                      <HStack
                        spacing='16px'
                        border='1px solid grey'
                        p={2}
                        cursor='pointer'
                      >
                        <Icon
                          as={AiOutlineMinus}
                          w={8}
                          h={6}
                          onClick={() => updateBag(item._id, -1)}
                        />
                        <Text textStyle='p'>
                          <Box as='span' w={8} h={6} fontWeight='bold'>
                            {item.quantity}
                          </Box>
                        </Text>
                        <Icon
                          as={AiOutlinePlus}
                          w={8}
                          h={6}
                          onClick={() => updateBag(item._id, 1)}
                        />
                      </HStack>
                    </Flex>
                  </Box>
                </HStack>
                <VStack spacing='auto'>
                  <Icon
                    as={AiOutlineClose}
                    boxSize='20px'
                    onClick={() => handleRemove(item._id)}
                    cursor='pointer'
                  />
                  <Text textStyle='p' fontWeight='bold'>
                    {' '}
                    &#8358;{item.price}
                  </Text>
                </VStack>
              </Flex>
            ))}
        </Box>
        <Divider borderBottom='2px solid #dcdcdc' />
        {bagItems.length >= 1 && (
          <Box w='100%' p='10px'>
            <Flex justify='space-between' mb={4}>
              <Heading as='h6' fontSize='lg'>
                Subtotal:
              </Heading>
              <Heading as='h6' fontSize='lg'>
                &#8358;{priceSum}
              </Heading>
            </Flex>
            <Button
              variant='with-shadow'
              size='xl'
              w='100%'
              sx={buttonStyle}
              onClick={handleCheckout}
              mb={4}
            >
              PAY WITH STRIPE
            </Button>
            <Link href='/paywithpaystack'>
              <Button
                variant='with-shadow'
                size='xl'
                w='100%'
                mb={4}
                sx={buttonStyle}
                onClick={close}
              >
                PAY WITH PAYSTACK
              </Button>
            </Link>
            {/* {isPending ? (
              <Box>Loading...</Box>
            ) : (
              <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
              />
            )} */}
          </Box>
        )}
      </Box>
    </Box>
  )
}
