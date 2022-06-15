import React from 'react'
import { Box, Flex, Container, Text } from '@chakra-ui/react'

export default function Error() {
  return (
    <Box mt='5rem' py={6}>
      <Container maxW='container.lg'>
        <Flex justify='center' align='center'>
          <Text fontSize='medium' align='center'>
            {statusCode
              ? `An error ${statusCode} occurred on server`
              : 'An error occurred on client'}
          </Text>
        </Flex>
      </Container>
    </Box>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}
