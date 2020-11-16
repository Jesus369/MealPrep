import React from "react";
import { Link } from "react-router-dom";

const Intro = ({ user, setCookies } = this.props) => {
  const logout = () => {
    setCookies.remove("token", { path: "/" });
  };
  if (user) {
    return (
      <div className="introduction_active">
        <div>
          <span className="lets_get_it">
            <Link to={"account/" + user.id}>Lets Get It {user.firstname} </Link>
          </span>
          <ul className="acct_details">
            <li
              onClick={() => {
                logout();
              }}
            >
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="introduction_inactive">
        <div>
          <div>
            <span>Dicover, Create, Change Your Pallet</span>
          </div>
          <div>
            <ul className="acct_details">
              <li className="register">
                <Link to="/register">Membership</Link>
              </li>
              <li className="login">
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
};

export default Intro;
