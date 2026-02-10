// frontend/src/apollo/client.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// MANUAL FIX: Hardcode production URL
const graphqlUri = window.location.hostname.includes('localhost') 
  ? 'http://localhost:4000/graphql'  // Local development
  : 'https://book-lister-backend-p1ro.vercel.app/graphql'; // Production

console.log('🔗 GraphQL URI:', graphqlUri, 'Hostname:', window.location.hostname);

const httpLink = createHttpLink({
  uri: graphqlUri,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;