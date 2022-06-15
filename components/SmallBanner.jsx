import React from 'react'
import {
  Box,
  Flex,
  Container,
  Icon,
  Stack,
  Text,
  Center,
  Divider,
  Button,
  useColorModeValue
} from '@chakra-ui/react'
import { ImLocation2 } from 'react-icons/im'
import Link from 'next/link'
import {motion} from 'framer-motion'

export default function SmallBanner({ smallBannerData }) {
  const word = smallBannerData.largeText1
  const newWord = word.split(' ')
  const bg = useColorModeValue('pallete.darkbg', 'pallete.lightWhite')
  return (
    <Box mt='5rem' py={5} bg={bg}>
      <Container maxW='container.lg'>
        <Flex
          justify='space-between'
          align='center'
          direction={{ base: 'column', lg: 'row' }}
          as={motion.div}
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
        >
          <Flex align='center' direction={{ base: 'column', lg: 'row' }} mb={8}>
            <Icon as={ImLocation2} boxSize='60px' />
            <Stack direction='column' spacing='0px' textAlign='center'>
              <Text textStyle='h2'>
                <Box as='span' color='pallete.lightGold'>
                  {newWord[0]}
                </Box>
                &nbsp;{newWord[1]}
              </Text>
              <Text textStyle='p' textTransform='uppercase'>
                {smallBannerData.midText}
              </Text>
            </Stack>
          </Flex>
          <Center
            height='100px'
            m='1.5rem'
            display={{ base: 'none', lg: 'block' }}
          >
            <Divider orientation='vertical' bg='pallete.lightGold' />
          </Center>
          <Flex align='center' direction={{ base: 'column', lg: 'row' }}>
            <Text textStyle='p' mx='1.5rem' mb={4} mt='10px'>
              {smallBannerData.largeText2}
            </Text>
            <Link href='/#'>
              <Button variant='with-shadow' size='xl'>
                {smallBannerData.buttonText}
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
