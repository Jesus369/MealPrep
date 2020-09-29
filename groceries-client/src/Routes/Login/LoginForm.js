import React, { useState } from "react";
import { withRouter } from "react-router-dom";
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

const LoginForm = ({ setCookies, history } = this.props) => {
  const [login] = useMutation(LOGIN_USER);

  const [values, setValues] = useState({ email: "", password: "" });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const loginUser = async () => {
    const { email, password } = values;
    const foundUser = await login({
      variables: { email: email, password: password }
    });
    await setCookies.set("token", foundUser.data.login.token, { path: "/" });
    await history.push("/home");
  };

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          loginUser();
        }}
      >
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
      </form>
    </div>
  );
};

export default withRouter(LoginForm);
