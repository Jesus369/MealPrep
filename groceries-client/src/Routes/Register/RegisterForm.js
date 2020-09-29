import React, { useState } from "react";

import { gql, useMutation } from "@apollo/client";

const REGISTER_USER = gql`
  mutation REGISTER_USER(
    $email: String!
    $username: String!
    $password: String!
    $firstname: String!
    $lastname: String!
  ) {
    registerUser(
      email: $email
      username: $username
      password: $password
      firstname: $firstname
      lastname: $lastname
    ) {
      ok
    }
  }
`;

const RegisterForm = () => {
  const [registerUser] = useMutation(REGISTER_USER);

  const [values, setValues] = useState({
    email: "",
    username: "",
    password: "",
    firstname: "",
    lastname: ""
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const register = async () => {
    const { email, username, password, firstname, lastname } = values;

    await registerUser({
      variables: {
        email: email,
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname
      }
    });
  };

  return (
    <div className="main">
      <form
        onChange={handleInputChange}
        className="form"
        onSubmit={e => {
          e.preventDefault();
          register();
        }}
      >
        <input
          name="email"
          type="text"
          value={values.email}
          placeholder="Email"
        />
        <input
          name="username"
          type="text"
          value={values.username}
          placeholder="Username"
        />
        <input
          name="password"
          type="text"
          value={values.password}
          placeholder="Password"
        />
        <input
          name="firstname"
          type="text"
          value={values.firstname}
          placeholder="Firstname"
        />
        <input
          name="lastname"
          type="text"
          value={values.lastname}
          placeholder="Lastname"
        />
        <input type="submit" placeholder="Submit" />
      </form>
    </div>
  );
};

export default RegisterForm;
