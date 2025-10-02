// pages/_app.tsx
import Head from 'next/head'

import { GlobalStyle } from '@/styles/global-style'

import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  // pages ルーターではこれだけで SSR されたスタイルがそのまま当たります
  return (
    <>
      <Head>
        <meta key="charset" name="charset" content="utf-8" />
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:type" content="website" />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}
