import type { AppProps } from 'next/app'
import { MantineProvider, createTheme } from '@mantine/core'
import { ApolloProvider } from '@apollo/client/react'
import { client } from '@/utils/apollo'

import '@mantine/core/styles.css'
import '@/app/globals.css'
import '@/app/code-block-pro.css'

const theme = createTheme(
  {
    fontFamily: 'Verdana, sans-serif',
    fontFamilyMonospace: 'Monaco, Courier, monospace',
    headings: { fontFamily: 'Greycliff CF, sans-serif' }
  }
)

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </MantineProvider>
  )
}
