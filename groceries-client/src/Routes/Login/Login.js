import React, { Component } from "react";
import LoginForm from "./LoginForm";

class Login extends Component {
  render({ cookies } = this.props) {
    console.log(cookies);
    return (
      <div>
        <LoginForm setCookies={cookies} />
      </div>
    );
  }
}

export default Login;
