import fetch from "node-fetch";
import ApolloClient from "apollo-boost";

export default new ApolloClient({
  uri:
    process.env.SAPPER_APP_GRAPQL || "http://hatchessentials.com/wp-api/graphql",
  fetch,
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  },
});
