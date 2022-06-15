import React from 'react'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import '../styles/globals.css'
import '@fontsource/poppins/400.css'
import '@fontsource/red-hat-display/800.css'
import 'swiper/css/bundle'
import { Toaster } from 'react-hot-toast'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import NProgress from 'nprogress'
import Router from 'next/router'
import config from 'react-reveal/globals'

import { Layout } from '../components'
import customTheme from '../theme/theme'
import { CartContext, useCartState } from '../contextHook/useCart'

function MyApp({ Component, pageProps }) {
  const cart = useCartState()
  NProgress.configure({ showSpinner: false })

  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })

  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
  config({ ssrFadeout: true })

  return (
    <>
      <ChakraProvider theme={customTheme}>
        <ColorModeScript
          initialColorMode={customTheme.config.initialColorMode}
        />
        <CartContext.Provider value={cart}>
          <PayPalScriptProvider deferLoading={true}>
            <Layout>
              <Toaster />
              <Component {...pageProps} />
            </Layout>
          </PayPalScriptProvider>
        </CartContext.Provider>
      </ChakraProvider>
    </>
  )
}

export default MyApp
