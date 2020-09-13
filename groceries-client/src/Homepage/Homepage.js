import React, { Component } from "react";
import Header from "./Header";
import IntroImgs from "./IntroImgs";
import AllLists from "./AllLists";

import "./styles/styles.css";

class Homepage extends Component {
  render() {
    return (
      <div className="displayHomepage">
        <Header />
        <IntroImgs />
        <AllLists />
        <div></div>
      </div>
    );
  }
}

export default Homepage;
