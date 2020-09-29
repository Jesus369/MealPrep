import React, { Component } from "react";
import decode from "jwt-decode";
import { withRouter } from "react-router-dom";

const Header = ({ setCookies } = this.props) => {
  const logout = () => {
    setCookies.remove("token", { path: "/" });
  };

  let user = null;
  if (setCookies.get("token")) {
    user = decode(setCookies.get("token")).access;
  }

  return (
    <div className="header">
      <span className="logo">My Meal Plan</span>
      <div className="myaccount">
        {user ? (
          <ul className="acct_details">
            <li>Account</li>
            <li
              onClick={() => {
                logout();
              }}
            >
              logout
            </li>
          </ul>
        ) : (
          <ul className="acct_details">
            <li>Register</li>
            <li>Login</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default withRouter(Header);
