import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject
} from '@apollo/client'
import { useMemo } from 'react'

let apolloClient: ApolloClient<NormalizedCacheObject>

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // if not windows, it means query will be build on server side
    link: new HttpLink({ uri: 'http://localhost:1337/graphql' }),
    cache: new InMemoryCache()
  })
}

export function initializeApollo(initialState = {}) {
  // if there's not an instance create a new one
  const apolloClientGlobal = apolloClient ?? createApolloClient()

  // data from cache
  if (initialState) {
    apolloClientGlobal.cache.restore(initialState)
  }

  // clean cache on server side to avoid share data from other user
  if (typeof window === 'undefined') return apolloClientGlobal
  // create apolloClient if on client side
  apolloClient = apolloClient ?? apolloClientGlobal

  return apolloClient
}

export function useApollo(initialState = {}) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
