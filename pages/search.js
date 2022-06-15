import React from 'react'
import { Box, Container, Heading, Grid, Flex, Icon } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { AiOutlineClose } from 'react-icons/ai'

import { client } from '../lib/client'
import FeatureProducts from '../components/FeatureProducts'

export default function Search({ searchQuery }) {
  const router = useRouter()
  const {
    keyword = 'all',
    category = 'all',
    brand = 'all',
    name = 'all',
  } = router.query

  const filteredResult = searchQuery.filter((item) => {
    return (
      item.name.toLowerCase().includes(keyword.toLowerCase()) ||
      item.brand.toLowerCase().includes(keyword.toLowerCase()) ||
      item.category.toLowerCase().includes(keyword.toLowerCase())
    )
  })

  return (
    <>
      <Head>
        <title>Search Products</title>
      </Head>

      <Box mt='5rem' py={5}>
        <Container maxW='container.lg'>
          <Heading as='h2' size='xl' mb={10} align='center' mt='2rem'>
            Search Results
          </Heading>
          <Flex justify='center' mb={6} gap='6px'>
            {filteredResult && filteredResult.length !== 0
              ? filteredResult.length
              : 'No'}{' '}
            items found
            {keyword !== 'all' && keyword !== '' && ' : ' + keyword}
            {category !== 'all' && ' : Category ' + category}
            {brand !== 'all' && ' : Brand ' + brand}
            {name !== 'all' && ' : Name ' + name}
            {(keyword !== 'all' && keyword !== '') || name !== 'all' ? (
              <Icon
                as={AiOutlineClose}
                boxSize='20px'
                onClick={() => router.push('/shop')}
                cursor='pointer'
              />
            ) : null}
          </Flex>
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
            {filteredResult?.map((product) => (
              <FeatureProducts product={product} key={product._id} />
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export async function getServerSideProps() {
  const gQuery = '*[_type == "product"]'
  const searchQuery = await client.fetch(gQuery)
  return {
    props: { searchQuery },
  }
}
