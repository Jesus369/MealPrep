import React, { Component } from "react";
import Header from "../../Components/Header";
import IntroImgs from "./IntroImgs";
import AllLists from "./AllLists";
import Intro from "./Intro";
import decode from "jwt-decode";

import "./styles/styles.css";

class Homepage extends Component {
  render({ cookies } = this.props) {
    let user = null;
    if (cookies.get("token")) {
      user = decode(cookies.get("token")).access;
    }
    console.log(user);
    return (
      <div className="displayHomepage">
        <Intro setCookies={cookies} user={user} />
        <IntroImgs />
        <AllLists />
        <div></div>
      </div>
    );
  }
}

export default Homepage;
