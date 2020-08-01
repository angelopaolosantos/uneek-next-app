import { ApolloProvider, ApolloClient, InMemoryCache, gql } from '@apollo/client'

const client = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache()
})

function AProvider(props) {
  return (
    <ApolloProvider {...props} client={client}>
      {props.children}
    </ApolloProvider>
  );
}

export default AProvider