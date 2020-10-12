import React, { Component } from "react";
import Header from "../../Components/Header";
import IntroImgs from "./IntroImgs";
import AllLists from "./AllLists";

import "./styles/styles.css";

class Homepage extends Component {
  render({ cookies } = this.props) {
    return (
      <div className="displayHomepage">
        <Header setCookies={cookies} />
        <IntroImgs />
        <AllLists />
        <div></div>
      </div>
    );
  }
}

export default Homepage;
