import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const LOGIN_USER = gql`
  mutation LOGIN_USER($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      error
    }
  }
`;

const LoginForm = ({ setCookies, history } = this.props) => {
  // Prepping The Mutation
  let loginError = null;
  let userId = null;

  const [values, setValues] = useState({ email: "", password: "", error: "" });
  const { email, password } = values;
  const [login, { error, loading, data }] = useMutation(LOGIN_USER, {
    variables: {
      email: email,
      password: password
    }
  });

  useEffect(() => {
    if (data) {
      if (data.login.ok == false) {
        loginError = data.login.error;
      }
      if (data.login.ok == true) {
        setCookies.set("token", data.login.token, { path: "/" });
        history.push("/home");
      }
    }
  });

  // Listening To User Input
  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          login();
        }}
      >
        {values.error}
        <input
          type="text"
          name="email"
          onChange={handleInputChange}
          value={values.email}
          placeholder="email"
        />
        <input
          type="text"
          name="password"
          onChange={handleInputChange}
          value={values.password}
          placeholder="password"
        />
        <input type="submit" />

        {data && data.login.ok == false ? <div>{data.login.error}</div> : ""}
      </form>
    </div>
  );
};

export default withRouter(LoginForm);
