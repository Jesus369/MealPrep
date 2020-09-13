import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo.js";
import Homepage from "./Homepage/Homepage";
import Register from "./Register/Register";

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = (
  <ApolloProvider client={client}>
    <Router>
      <Route exact path="/home" component={Homepage} />
      <Route exact path="/register" component={Register} />
    </Router>
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById("root"));
serviceWorker.unregister();
