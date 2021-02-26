import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://localhost:3000/graphql'
    }),
    onError: ({ networkError, graphQLErrors }) => {
        console.log('graphQLErrors', graphQLErrors);
        console.log('networkError', networkError);
    }
});

export default client;