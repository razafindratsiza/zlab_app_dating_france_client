import { ApolloClient, InMemoryCache } from '@apollo/client';



// Initialize Apollo client
const GqlClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_SERVER_URI ,
    cache: new InMemoryCache(),
});



export default GqlClient