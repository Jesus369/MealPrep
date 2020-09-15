import React, { useState } from "react";

import { gql, useMutation } from "@apollo/client";

const LOGIN_USER = gql`
  mutation LOGIN_USER($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      firstname
      username
    }
  }
`;

const LoginForm = () => {
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
    console.log(foundUser);
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
