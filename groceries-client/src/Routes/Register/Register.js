import React, { Component } from "react";
import RegisterForm from "./RegisterForm";

import "./Styles/styles.css";
import Header from "../../Components/Header";

class Register extends Component {
  render() {
    return (
      <div>
        <Header setCookies={this.props.cookies} />
        <RegisterForm setCookies={this.props.cookies} />
      </div>
    );
  }
}

export default Register;
