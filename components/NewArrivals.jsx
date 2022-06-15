import React from 'react'
import { Box, Text, Flex, Image, IconButton, Container } from '@chakra-ui/react'
import { MdArrowForwardIos, MdArrowBackIosNew } from 'react-icons/md'
import Link from 'next/link'
//import Zoom from 'react-reveal/Zoom'
import { motion } from 'framer-motion'

import useScrollRef from '../lib/useScrollRef'

export default function NewArrivals({ newArrival }) {
  const [scroll, scrollRef] = useScrollRef()

  const basicBoxStyle = {
    bg: 'pallete.lightGold',
    color: 'white',
    _hover: {
      border: '1px solid black',
    },
  }
  return (
    <Box mt='5rem'>
      <Container maxW='container.2xl' mb={4}>
        <Text textStyle='h2'>New Arrivals</Text>

        <Flex
          flex='1'
          direction='row'
          position='relative'
          maxW='100%'
          as={motion.div}
        >
          <Flex
            direction='row'
            w='max-content'
            overflowX='scroll'
            ref={scrollRef}
            gap='20px'
            as={motion.div}
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
          >
            {newArrival?.map((product) => (
              <Link href={`/product/${product.slug.current}`} key={product._id}>
                <Flex
                  direction='column'
                  justify='center'
                  align='center'
                  minW='310px'
                  position='relative'
                  h='480px'
                  bg='pallete.lightGrey'
                  cursor='pointer'
                >
                  <Image
                    src={product.image[0].urlField}
                    boxSize='280px'
                    objectFit='contain'
                    alt='products'
                    className='img-scale'
                  />
                  <Box
                    mt={6}
                    color='pallete.darkBlack'
                    bg='pallete.lightBg'
                    w='full'
                    p={4}
                    textAlign='start'
                    position='absolute'
                    bottom='0px'
                  >
                    <Text textStyle='p' fontWeight='bold' mb={4}>
                      {product.name}
                    </Text>
                    <Text textStyle='p'>{product.caption}</Text>
                  </Box>
                </Flex>
              </Link>
            ))}
          </Flex>
          <Flex
            display={{ base: 'none', lg: 'block' }}
            position='absolute'
            bottom='50%'
            w='100%'
            px='2rem'
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
  )
}
