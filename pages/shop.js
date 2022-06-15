import React from 'react'
import { Box, Container, Grid, Heading } from '@chakra-ui/react'
import Head from 'next/head'

import { client } from '../lib/client'
import FeatureProducts from '../components/FeatureProducts'

export default function Shop({ shop }) {
  console.log({shop})
  try {
    return (
      <>
        <Head>
          <title>Shop</title>
        </Head>

        <Box mt='5rem' py={5}>
          <Container maxW='container.lg'>
            <Heading as='h2' size='xl' mb={10}>
              SHOP PRODUCTS
            </Heading>

            <Grid
              templateColumns={{
                sm: 'repeat(2, 1fr)',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
                xl: 'repeat(4, 1fr)',
                '2xl': 'repeat(4, 1fr)',
                base: 'repeat(1, 1fr)',
              }}
              gap={3}
            >
              {shop?.map((product) => (
                <FeatureProducts product={product} key={product._id} />
              ))}
            </Grid>
          </Container>
        </Box>
      </>
    )
  } catch (error) {
    throw new Error('sorry could not refresh, try again')
  }
}

export async function getServerSideProps() {
  const query = '*[_type == "product"]'
  const shop = await client.fetch(query)

  return {
    props: { shop },
  }
}
