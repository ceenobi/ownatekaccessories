import React from 'react'
import Link from 'next/link'
import { Box, Text, Button, Image } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/lazy'
import 'swiper/css/navigation'
import 'swiper/css'
import { Lazy, Navigation, EffectFade, Autoplay } from 'swiper'

export default function HeroBanner({ heroData }) {
  const bannerImages = [heroData.image[0].urlField, heroData.image[1].urlField]
  return (
    <Box position='relative' h={{ base: '500px', lg: '700px' }} w='100%'>
      <Swiper
        style={{ '--swiper-navigation-color': '#fff' }}
        lazy={true}
        navigation={true}
        loop={true}
        effect={'fade'}
        autoplay={{
          delay: 3500,
          disableOnInteraction: true,
        }}
        modules={[EffectFade, Lazy, Autoplay]}
        className='mySwiper'
      >
        {bannerImages.map((banner, index) => (
          <SwiperSlide key={index}>
              <Box>
                <Image
                  src={banner}
                  w='100%'
                  h={{ base: '600px', lg: '700px' }}
                  alt='property'
                  objectFit='cover'
                  className='swiper-lazy'
                />
              </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <Box
        position='absolute'
        left='50%'
        top='50%'
        transform='translate(-50%, -50%)'
        p={2}
        zIndex={1}
        textAlign='center'
        w={{ base: 'inherit', md: '700px' }}
      >
        <Text textStyle='h2' mb={4} color='pallete.lightBg'>
          {heroData.product}
        </Text>
        <Text textStyle='p' mb={4} color='pallete.lightBg'>
          {heroData.desc}
        </Text>
        <Link href='/shop'>
          <Button variant='with-shadow' size='xl'>
            {heroData.buttonText}
          </Button>
        </Link>
      </Box>
    </Box>
  )
}
