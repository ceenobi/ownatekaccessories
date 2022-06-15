import React from 'react'
import { Box, Container, Grid, Heading } from '@chakra-ui/react'
import Head from 'next/head'

import { client } from '../lib/client'
import FeatureProducts from '../components/FeatureProducts'

export default function Smartwatch({ smartwatch }) {
  const head = smartwatch.map((item) => item.category)
  try {
    return (
      <>
        <Head>
          <title>Smartwatch</title>
        </Head>
        <Box mt='5rem' py={5}>
          <Container maxW='container.lg'>
            <Heading as='h2' size='xl' mb={10}>
              {head[0]}
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
              {smartwatch?.map((product) => (
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
  const query = '*[_type == "product" && category == "Smartwatch"]'
  const smartwatch = await client.fetch(query)

  return {
    props: { smartwatch },
  }
}
