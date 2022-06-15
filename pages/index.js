import React from 'react'
import { Box, VStack, Text, Container, Grid } from '@chakra-ui/react'

import { client } from '../lib/client'
import {
  HeroBanner,
  HeroBannerB,
  NewArrivals,
  SmallBanner,
  FeatureProducts,
} from '../components'

export default function Home({
  products,
  bannerData,
  newArrivalData,
  promoData,
}) {
  try {
    return (
      <>
        <HeroBanner heroData={bannerData.length && bannerData[0]} />
        <Box mt='5rem' py={5}>
          <Container maxW='container.lg'>
            <VStack spacing='20px' mb='5rem'>
              <Text textStyle='h2'>Shop & Save</Text>
            </VStack>
            <Grid
              templateColumns={{
                sm: 'repeat(2, 1fr)',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(4, 1fr)',
                xl: 'repeat(4, 1fr)',
                '2xl': 'repeat(4, 1fr)',
                base: 'repeat(1, 1fr)',
              }}
              gap={4}
            >
              {products?.map((product) => (
                <FeatureProducts key={product._id} product={product} />
              ))}
            </Grid>
          </Container>
        </Box>
        <HeroBannerB
          heroBannerData={bannerData.length && bannerData[0]}
          promo={promoData}
        />
        <NewArrivals newArrival={newArrivalData} />
        <SmallBanner smallBannerData={bannerData.length && bannerData[1]} />
      </>
    )
  } catch (error) {
    throw new Error('sorry could not refresh, try again')
  }
}

export async function getServerSideProps() {
  const query = '*[_type == "product"][0...4]'
  const products = await client.fetch(query)

  const newArrivalQuery = '*[_type == "product"]'
  const newArrivalData = await client.fetch(newArrivalQuery)

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

  const promoQuery =
    '*[_type == "product" && slug.current == "beats-studio-buds"]'
  const promoData = await client.fetch(promoQuery)

  return {
    props: { products, bannerData, newArrivalData, promoData },
  }
}
