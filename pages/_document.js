import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css'
          integrity='sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=='
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
        />
      </Head>
      <body>
        <Main />

        <NextScript />
        <script src='https://www.paypal.com/sdk/js?client-id=AWnuHYa2CUVHATed3mzHV92fA49Nx9WfUV_727KXZBDUzQKhMNH4ux4sYPqqOwXAEgqUDm4syHWF0j39&currency=USD'></script>
      </body>
    </Html>
  )
}
