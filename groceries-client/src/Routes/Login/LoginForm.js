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

const Login = ({ setCookies, history } = this.props) => {
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
      } else {
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
    <div className="form_page">
      <div>
        <form
          className="login_form"
          onSubmit={e => {
            e.preventDefault();
            login();
          }}
        >
          <a>LOGIN</a>
          {values.error}
          <input
            type="text"
            name="email"
            onChange={handleInputChange}
            value={values.email}
            placeholder="EMAIL"
          />
          <div></div>
          <input
            type="text"
            name="password"
            onChange={handleInputChange}
            value={values.password}
            placeholder="PASSWORD"
          />
          <div></div>
          <button>SUBMIT</button>

          {data && data.login.ok == false ? (
            <span>{data.login.error}</span>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);
