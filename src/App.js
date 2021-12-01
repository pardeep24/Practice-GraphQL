import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";
import AniList from "./Components/AniList/AniList";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, location, path }) => {
      return console.log(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "https://graphql.anilist.co" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <AniList />
      </div>
    </ApolloProvider>
  );
}

export default App;
