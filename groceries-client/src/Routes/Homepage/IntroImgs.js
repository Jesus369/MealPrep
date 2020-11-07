import React, { Component } from "react";

class IntroImgs extends Component {
  render() {
    return (
      <div>
        <ul className="img_logo_list">
          <li>
            <img alt="Food" src={require("../../imgs/image.png")}></img>
          </li>
          <li>
            <img alt="Food" src={require("../../imgs/salmon.png")}></img>
          </li>
          <li>
            <img alt="Food" src={require("../../imgs/healthy.png")}></img>
          </li>
        </ul>
      </div>
    );
  }
}

export default IntroImgs;
