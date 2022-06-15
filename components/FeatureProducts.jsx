import React from 'react'
import { Box, useStyleConfig, Image, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import Fade from 'react-reveal/Fade'

const Card = React.forwardRef((props, ref) => {
  const { variant, ...rest } = props
  const styles = useStyleConfig('Card', { variant })

  return <Box __css={styles} {...rest} ref={ref} />
})

export default function FeatureProducts({
  product: { image, slug, price, desc, name },
}) {
  const ref = React.createRef()
  return (
    <Fade bottom>
      <Link href={`/product/${slug.current}`} ref={ref}>
        <Card variant='smooth'>
          <Image
            src={image && image[0].urlField}
            boxSize='250px'
            borderRadius='md'
            objectFit='contain'
            cursor='pointer'
            className='img-scale'
            mb={2}
          />
          <VStack spacing='10px' mb={6}>
            <Text textStyle='p' fontWeight='bold'>
              {name}
            </Text>
            <Text textStyle='p' fontWeight='bold'>
              {desc}
            </Text>
            <Text textStyle='p' color='pallete.lightGold'>
              &#8358;{price}
            </Text>
          </VStack>
        </Card>
      </Link>
    </Fade>
  )
}
