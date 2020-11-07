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
      error
    }
  }
`;

const RegisterForm = () => {
  const [values, setValues] = useState({
    email: "",
    username: "",
    password: "",
    firstname: "",
    lastname: ""
  });
  const { email, username, password, firstname, lastname } = values;
  const [registerUser, { data }] = useMutation(REGISTER_USER, {
    variables: {
      email: email,
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname
    }
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="form_page">
      <div>
        <form
          className="register_form"
          onSubmit={e => {
            e.preventDefault();
            registerUser();
          }}
        >
          <span>REGISTER</span>
          <input
            name="email"
            type="text"
            value={values.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <div className="div_line"></div>
          <input
            name="username"
            type="text"
            value={values.username}
            onChange={handleInputChange}
            placeholder="Username"
          />
          <div className="div_line"></div>
          <input
            name="password"
            type="text"
            value={values.password}
            onChange={handleInputChange}
            placeholder="Password"
          />
          <div className="div_line"></div>
          <input
            name="firstname"
            type="text"
            value={values.firstname}
            onChange={handleInputChange}
            placeholder="Firstname"
          />
          <div className="div_line"></div>
          <input
            name="lastname"
            type="text"
            value={values.lastname}
            onChange={handleInputChange}
            placeholder="Lastname"
          />
          <button>SUBMIT</button>{" "}
          <div className="register_error">
            {" "}
            {data && data.registerUser.ok === false ? (
              <span className="error_text"> {data.registerUser.error} </span>
            ) : (
              ""
            )}{" "}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
