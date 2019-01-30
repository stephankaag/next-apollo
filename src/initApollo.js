import { AWSAppSyncClient } from 'aws-appsync'
import fetch from 'isomorphic-fetch'
import isFunction from 'lodash.isfunction'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create(apolloConfig, initialState) {
  const config = {
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    disableOffline: true,
    ...apolloConfig
  }

  const client = new AWSAppSyncClient(config)

  if (initialState) {
    client.cache.restore(initialState)
  }

  return client
}

export default function initApollo(apolloConfig, initialState, ctx) {
  if (isFunction(apolloConfig)) {
    apolloConfig = apolloConfig(ctx)
  }
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(apolloConfig, initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(apolloConfig, initialState)
  }

  return apolloClient
}
