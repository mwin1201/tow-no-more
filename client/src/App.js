import React from "react";
import { 
  ApolloProvider, // React component to provide data to other components
  ApolloClient,  // constructor function to help initialize the connection to the GraphQL API server
  InMemoryCache,  // enables Apollo Client instance to cache API response data - perform requests more efficiently
  createHttpLink  // allows us control over how the Apollo Client makes a request
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// pages
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";

// components
import Header from "./components/Header";
import Footer from "./components/Footer";

const httpLink = createHttpLink({
  uri: "/graphql"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}`: ""
    }
  };
});

//link authLink and httpLink so every request retrieves the token
//and sets the request headers before making the request to the API.
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />            
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
