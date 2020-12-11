import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";

const httpLink = createHttpLink({
  uri: "http://localhost:8081/graphql"
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    // Rendering errors in GraphQL
    graphQLErrors.map(({ message, extensions }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${extensions.code}`
      );
      return null;
    });
  }
  if (networkError) {
    // Pushing client(user) to NotFound page
  }
});

const client = new ApolloClient({
  ssrMode: true,
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "network-only"
    }
  }
});

export default client;
