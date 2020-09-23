import React, { useState } from "react";
import decode from "jwt-decode";

import { gql, useMutation } from "@apollo/client";

const LOGIN_USER = gql`
  mutation LOGIN_USER($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
    }
  }
`;

const LoginForm = ({ setCookies } = this.props) => {
  const [login] = useMutation(LOGIN_USER);

  const [values, setValues] = useState({ email: "", password: "" });

  const handleInputChange = e => {
    const { email, password } = values;
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const loginUser = async () => {
    const { email, password } = values;
    const foundUser = await login({
      variables: { email: email, password: password }
    });
    setCookies.set("token", foundUser.data.login.token, { path: "/" });
    const cookie = setCookies.get("token");
    console.log(decode(cookie));
  };

  return (
    <div>
      <form
        onChange={handleInputChange}
        onSubmit={e => {
          e.preventDefault();
          loginUser();
        }}
      >
        <input
          type="text"
          name="email"
          value={values.email}
          placeholder="email"
        />
        <input
          type="text"
          name="password"
          value={values.password}
          placeholder="password"
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default LoginForm;
