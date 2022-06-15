import React from 'react'
import { Box, Container, Grid, Heading } from '@chakra-ui/react'
import Head from 'next/head'

import { client } from '../lib/client'
import FeatureProducts from '../components/FeatureProducts'

export default function Earbuds({ earbuds }) {
  const head = earbuds.map((item) => item.category)
  try {
    return (
      <>
        <Head>
          <title>Earbuds</title>
        </Head>
        <section>
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
                {earbuds?.map((product) => (
                  <FeatureProducts product={product} key={product._id} />
                ))}
              </Grid>
            </Container>
          </Box>
        </section>
      </>
    )
  } catch (e) {
    throw new Error('sorry could not refresh, try again')
  }
}

export async function getServerSideProps() {
  const query = '*[_type == "product" && category == "Earbuds"]'
  const earbuds = await client.fetch(query)

  return {
    props: { earbuds },
  }
}
