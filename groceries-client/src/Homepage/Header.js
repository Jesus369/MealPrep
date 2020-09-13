import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <span className="logo">My Meal Plan</span>
        <div className="myaccount">
          <ul className="acct_details">MyAccount</ul>
        </div>
      </div>
    );
  }
}

export default Header;
