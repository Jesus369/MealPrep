import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import Register from "./Register/Register";
import Login from "./Login/Login";
import { withCookies } from "react-cookie";

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
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    );
  }
}

export default withCookies(Routes);
