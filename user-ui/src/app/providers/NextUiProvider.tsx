'use client'

import GqlClient from '@/graphql/GqlClient'
import store from '@/redux/store'
import { ApolloProvider } from '@apollo/client'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { Provider } from 'react-redux'
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ApolloProvider client={GqlClient}>
        <NextUIProvider>
          <NextThemesProvider attribute='class' defaultTheme='light'>
            {children}
          </NextThemesProvider>
        </NextUIProvider>
      </ApolloProvider>
    </Provider>
  )
}