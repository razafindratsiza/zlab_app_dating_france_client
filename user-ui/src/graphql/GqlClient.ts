
import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat, ApolloProvider, split } from '@apollo/client';
import Cookies from 'js-cookie';
const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_SERVER_URI });
import { getMainDefinition } from '@apollo/client/utilities';
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext((_,{ headers = {} }) => ({
    headers: {
      ...headers,
      accesstoken: Cookies.get('access_token'),
      refreshtoken: Cookies.get('refresh_token'),
    }
  }));

  return forward(operation);
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  httpLink,
);

// Initialize Apollo client
const GqlClient = new ApolloClient({
  link: concat(authMiddleware, splitLink),
  cache: new InMemoryCache(),
});



export default GqlClient