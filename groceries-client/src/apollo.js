import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";

const link = createHttpLink({
  uri: "http://localhost:8081/graphql"
});

const client = new ApolloClient({
  ssrMode: true,
  link,
  cache: new InMemoryCache()
});

export default client;
