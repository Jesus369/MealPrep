import React, { Component } from "react";
import LoginForm from "./LoginForm";
import Header from "../../Components/Header";

import "./styles/styles.css";

class Login extends Component {
  render() {
    return (
      <div>
        <Header setCookies={this.props.cookies} />
        <LoginForm setCookies={this.props.cookies} />
      </div>
    );
  }
}

export default Login;
