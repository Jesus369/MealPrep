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
    });
  }
  if (networkError) {
    // Pushing client(user) to NotFound page
    this.props.history.push("/network-error");
  }
});

const client = new ApolloClient({
  ssrMode: true,
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
