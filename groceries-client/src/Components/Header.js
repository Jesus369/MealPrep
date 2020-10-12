import React from "react";
import decode from "jwt-decode";
import { withRouter, Link } from "react-router-dom";

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
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default withRouter(Header);
