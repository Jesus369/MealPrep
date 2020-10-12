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
    <div className="form_page">
      <div>
        <form
          className="register_form"
          onChange={handleInputChange}
          onSubmit={e => {
            e.preventDefault();
            register();
          }}
        >
          <a>REGISTER</a>
          <input
            name="email"
            type="text"
            value={values.email}
            placeholder="Email"
          />
          <div></div>
          <input
            name="username"
            type="text"
            value={values.username}
            placeholder="Username"
          />
          <div></div>
          <input
            name="password"
            type="text"
            value={values.password}
            placeholder="Password"
          />
          <div></div>
          <input
            name="firstname"
            type="text"
            value={values.firstname}
            placeholder="Firstname"
          />
          <div></div>
          <input
            name="lastname"
            type="text"
            value={values.lastname}
            placeholder="Lastname"
          />
          <div></div>
          <button>SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
