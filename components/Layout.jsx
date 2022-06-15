import React from 'react'
import Head from 'next/head'
import { Box, useColorMode, } from '@chakra-ui/react'
import { motion } from 'framer-motion'
//import { MdDarkMode, MdLightMode } from 'react-icons/md'

import Footer from './Footer'
import Navbar from './Navbar'

export default function Layout({ title, description, children }) {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
      <Head>
        <title>
          {title ? `${title} - Ownatek Accessories` : 'Ownatek Accessories'}
        </title>
        {description && <meta name='description' content={description}></meta>}
      </Head>
      <header>
        <Navbar colorMode={colorMode} toggleColorMode={toggleColorMode} />
      </header>
      <Box
        as={motion.div}
        whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
        transition={{ duration: 0.5 }}
      >
        <main>
          {/* <IconButton
            size='lg'
            color='pallete.lightGold'
            border='1px'
            variant='link'
            icon={colorMode === 'light' ? <MdDarkMode /> : <MdLightMode />}
            aria-label={'Change Color Theme'}
            onClick={toggleColorMode}
            position='fixed'
            bottom='50%'
          /> */}
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
      </Box>
    </>
  )
}
