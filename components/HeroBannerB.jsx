import React from 'react'
import Link from 'next/link'
import { Box, Text, Button, Image, Flex, VStack } from '@chakra-ui/react'
import Fade from 'react-reveal/Fade'

export default function HeroBannerB({ heroBannerData, promo }) {
  const beats = promo?.map((item) => item.slug.current)
  const bannerImages = [heroBannerData.image[2].urlField]
  return (
    <Flex mt='5rem' py={5} flexWrap='wrap' justifyContent='flex-start' w='100%'>
      {bannerImages.map((banner, index) => (
        <Box key={index}>
          <Image
            src={banner}
            boxSize={{ base: '410px', xl: '500px' }}
            alt='property'
            objectFit='cover'
          />
        </Box>
      ))}
      <Flex flex='1' direction='column' bg='pallete.lightGold'>
        <Box
          display='flex'
          justifyContent='center'
          flexDirection='column'
          alignItems='center'
          m='auto'
          p={5}
        >
          <VStack spacing='20px'>
            <Fade right>
              <Text textStyle='h1' textAlign='center' color='pallete.lightBg'>
                {heroBannerData.discount}
              </Text>
            </Fade>
            <Fade left>
              <Text textStyle='p'>
                <Box as='span' fontWeight='bold'>
                  {heroBannerData.midText}
                </Box>
                {heroBannerData.largeText1}
              </Text>
            </Fade>
            <Fade bottom>
              <Link href={`/product/${beats}`}>
                <Button variant='smooth' size='xl'>
                  {heroBannerData.buttonText}
                </Button>
              </Link>
            </Fade>

            <Text textStyle='p'>{heroBannerData.smallText}</Text>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  )
}
