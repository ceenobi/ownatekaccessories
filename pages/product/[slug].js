import React, { useState } from 'react'
import {
  Box,
  Container,
  Image,
  Text,
  Flex,
  Button,
  HStack,
  Stack,
  Heading,
  IconButton,
} from '@chakra-ui/react'
//import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { MdArrowForwardIos, MdArrowBackIosNew } from 'react-icons/md'
import Link from 'next/link'
import Head from 'next/head'

import { client } from '../../lib/client'
import { RenderIf } from '../../lib/renderIf'
import { useCart } from '../../contextHook/useCart'
import useScrollRef from '../../lib/useScrollRef'

export default function ProductDetails({ productId, products }) {
  const { setShowBag, addBag, bagItems } = useCart()
  const [index, setIndex] = useState(0)
  const [scroll, scrollRef] = useScrollRef()
  const {
    image,
    name,
    details,
    price,
    header,
    stock,
    midText,
    smallText,
    category,
    brand,
  } = productId

  const relatedTo = products.filter((item) => item.category !== category)

  const outterBoxStyle = {
    bg: 'pallete.lightGrey',
    cursor: 'pointer',
    h: '320px',
    position: 'relative',
  }
  const basicBoxStyle = {
    bg: 'pallete.lightGold',
    color: 'white',
    _hover: {
      border: '1px solid black',
    },
  }
  //const rating = 4

  const handleBuyNow = () => {
    addBag(productId)
    setShowBag(true)
  }
  return (
    <>
      <Head>
        <title>{productId?.name}</title>
      </Head>
      <section>
        <Box mt='5rem' py={5}>
          <Container maxW='container.lg'>
            <Flex
              justify={{ base: 'flex-start', lg: 'space-between' }}
              mt={6}
              direction={{ base: 'column', lg: 'row' }}
            >
              <Box mb={6}>
                <Heading as='h2' size='2xl'>
                  {name}
                </Heading>
                <Text textStyle='p'>{header}</Text>
              </Box>
              <HStack spacing='auto' mb={6}>
                <Text
                  textStyle='md'
                  color='pallete.lightGold'
                  mx={{ base: 'null', lg: '10px' }}
                >
                  &#8358;{price}
                </Text>
                <RenderIf isTrue={stock > 0}>
                  <Button
                    variant='smooth'
                    size='lg'
                    onClick={() => addBag(productId)}
                  >
                    ADD TO BAG
                  </Button>
                </RenderIf>
                <RenderIf isTrue={!stock}>
                  <Button variant='smooth' size='lg' disabled>
                    OUT OF STOCK
                  </Button>
                </RenderIf>
              </HStack>
            </Flex>
            <Flex
              direction='column'
              justify='center'
              align='center'
              minW='100%'
              position='relative'
              h='500px'
              mr='2rem'
              bg='pallete.lightGrey'
            >
              <Image
                src={image && image[index].urlField}
                w={{ base: '280px', lg: '450px' }}
                h={{ base: '280px', lg: '452px' }}
                objectFit='cover'
                alt={name}
                className='img-scale'
              />
            </Flex>
            <Flex gap='10px' mt='20px'>
              {image?.map((item, i) => (
                <Box key={i}>
                  <Image
                    src={item.urlField}
                    className={
                      i === index ? 'small-image selected-image' : 'small-image'
                    }
                    onMouseEnter={() => setIndex(i)}
                  />
                </Box>
              ))}
            </Flex>
            <Flex
              justify='center'
              direction='column'
              mt='5rem'
              textAlign='center'
            >
              <Box mb={6}>
                <Box mb={4}>
                  <RenderIf isTrue={stock > 0}>
                    <Text textStyle='p'>STATUS: AVAILABLE</Text>
                  </RenderIf>
                  <RenderIf isTrue={!stock}>
                    <Text textStyle='p'>STATUS: OUT OF STOCK</Text>
                  </RenderIf>
                </Box>
                {/* <Box mx='6px'>
                {Array(5)
                  .fill('')
                  .map((_, i) => (
                    <Icon
                      as={AiFillStar}
                      boxSize='15px'
                      mt={3}
                      key={i}
                      color={i < rating ? 'teal.500' : 'gray.700'}
                    />
                  ))}
              </Box> */}

                <Flex justify='center' align='center' gap='10px'>
                  <Text textStyle='p' mx='2px'>
                    Brand: {brand}
                  </Text>
                  {/* <HStack
                  spacing='16px'
                  border='1px solid grey'
                  p={2}
                  cursor='pointer'
                  mr='2rem'
                >
                  <Icon as={AiOutlineMinus} w={8} h={6} onClick={decQty} />
                  <Text textStyle='p'>
                    <Box as='span' w={8} h={6}>
                      {qty}
                    </Box>
                  </Text>
                  <Icon as={AiOutlinePlus} w={8} h={6} onClick={incQty} />
                </HStack> */}
                  <Box>
                    <RenderIf isTrue={stock > 0}>
                      <Button variant='smooth' size='lg' onClick={handleBuyNow}>
                        BUY NOW
                      </Button>
                    </RenderIf>
                    <RenderIf isTrue={!stock}>
                      <Button variant='smooth' size='lg' disabled>
                        OUT OF STOCK
                      </Button>
                    </RenderIf>
                  </Box>
                </Flex>
              </Box>
            </Flex>
            <Flex
              justify='center'
              align='center'
              mt='5rem'
              mb={6}
              direction='column'
              textAlign='center'
            >
              <Heading as='h6' size='lg' mt={2}>
                Description
              </Heading>
              <Box mt={6}>
                <Text textStyle='p'>{details}</Text>
              </Box>
            </Flex>
            <Stack
              mt='5rem'
              py={5}
              justify='space-betwen'
              direction={{ base: 'column', lg: 'row' }}
              spacing='auto'
              align='center'
            >
              <Box
                textAlign={{ base: 'center', lg: 'left' }}
                w={{ base: '100%', lg: '500px' }}
                mb='2rem'
              >
                <Heading as='h2' size='xl' fontWeight='bold' mb={15}>
                  {smallText}
                </Heading>
                <Text textStyle='p'>{midText}</Text>
              </Box>

              <Image
                src={image && image[2].urlField}
                w={{ base: '100%', md: '410px' }}
                h={{ base: '100%', md: '310px' }}
                objectFit='contain'
                alt={name}
                className='img-scale'
                bg='palevioletred.lightWhite'
              />
            </Stack>
            <Flex justify='center' mt='5rem' mb='3rem'>
              <Heading as='h6' size='lg'>
                You may also like
              </Heading>
            </Flex>

            {/* <Box className='marquee' p={4}>
        <Flex justify='center' gap='15px' className='track'>
          {relatedTo.map((item) => (
            <Link href={`/product/${item.slug.current}`} key={item._id}>
              <Box sx={outterBoxStyle}>
                <Image
                  src={item.image[1].urlField}
                  boxSize='200px'
                  objectFit='contain'
                  alt={item.name}
                  mt='20px'
                  className='img-scale'
                />
                <Box
                  textAlign='start'
                  position='absolute'
                  bottom='0px'
                  color='pallete.darkBlack'
                  bg='pallete.lightBg'
                  w='full'
                  p={4}
                >
                  <Text textStyle='p' fontWeight='bold' mb={4}>
                    {item.name}
                  </Text>
                  <Text textStyle='p'> &#8358;{item.price}</Text>
                </Box>
              </Box>
            </Link>
          ))}
        </Flex>
      </Box> */}

            <Flex
              flex='1'
              direction='row'
              position='relative'
              justify='center'
              maxW='100%'
              mt={6}
            >
              <Flex
                direction='row'
                w='max-content'
                overflowX='scroll'
                ref={scrollRef}
                gap='20px'
              >
                {relatedTo?.map((item) => (
                  <Link href={`/product/${item.slug.current}`} key={item._id}>
                    <Box
                      sx={outterBoxStyle}
                      minW='270px'
                      h='480px'
                      align='center'
                    >
                      <Image
                        src={item.image[1].urlField}
                        boxSize='230px'
                        objectFit='contain'
                        alt={item.name}
                        mt='20px'
                        className='img-scale'
                      />
                      <Box
                        textAlign='start'
                        position='absolute'
                        bottom='0px'
                        color='pallete.darkBlack'
                        bg='pallete.lightBg'
                        w='full'
                        p={2}
                      >
                        <Text textStyle='p' fontWeight='bold' mb={4}>
                          {item.name}
                        </Text>
                        <Text textStyle='p'> &#8358;{item.price}</Text>
                      </Box>
                    </Box>
                  </Link>
                ))}
              </Flex>
              <Flex
                display={{ base: 'none', lg: 'block' }}
                position='absolute'
                bottom='50%'
                w='100%'
              >
                <Flex justify='space-between' align='center'>
                  <IconButton
                    boxSize='50px'
                    icon={<MdArrowBackIosNew />}
                    isRound
                    variant='link'
                    sx={basicBoxStyle}
                    aria-label='Scroll-button'
                    onClick={() => scroll('left')}
                  />
                  <IconButton
                    icon={<MdArrowForwardIos />}
                    boxSize='50px'
                    isRound
                    sx={basicBoxStyle}
                    aria-label='Scroll-button'
                    onClick={() => scroll('right')}
                  />
                </Flex>
              </Flex>
            </Flex>
          </Container>
        </Box>
      </section>
    </>
  )
}

export async function getStaticPaths() {
  const query = `*[_type == "product"] {
     slug {
         current
     }
 }`
  const products = await client.fetch(query)
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }))
  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params: { slug } }) {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`
  const productQuery = '*[_type == "product"]'
  const productId = await client.fetch(query)
  const products = await client.fetch(productQuery)

  return {
    props: { productId, products },
  }
}
