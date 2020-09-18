import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "@apollo/client";
import { CookiesProvider } from "react-cookie";
import client from "./apollo.js";
import Routes from "./Routes/Routes";

const App = (
  <CookiesProvider>
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  </CookiesProvider>
);

ReactDOM.render(App, document.getElementById("root"));
serviceWorker.unregister();
