import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withCookies } from "react-cookie";

// Routes
import Homepage from "./Homepage/Homepage";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Account from "./User/Account";
import NotFound from "./NotFound/NotFound";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/home"
            render={() => <Homepage cookies={this.props.cookies} />}
          />
          <Route
            path="/login"
            render={() => <Login cookies={this.props.cookies} />}
          />
          <Route
            path="/register"
            render={() => <Register cookies={this.props.cookies} />}
          />
          <Route path="/account/:userId" component={Account} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default withCookies(Routes);
