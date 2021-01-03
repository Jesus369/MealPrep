import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import NewCustomMeal from "./NewCustomMeal";
import EmptyMeals from "./EmptyMeals";

const Meals = ({ meals, userIdProps } = this.props) => {
  const [rendered, changeRender] = useState({
    renderedState: "empty"
  });

  if (!meals || meals.length == 0) {
    return (
      <div>
        {rendered.renderedState === "empty" ? (
          <EmptyMeals renderChange={changeRender} />
        ) : (
          <NewCustomMeal userId={userIdProps} renderChange={changeRender} />
        )}
      </div>
    );
  } else {
    return (
      <div className="meals_listing">
        {meals.map(m => (
          <ul className="meal">
            <li>{m.photo}</li>
            <li>{m.name}</li>
          </ul>
        ))}
        <div>
          <Link to={"/groceries/" + userIdProps}>Add new tab</Link>
        </div>
      </div>
    );
  }
};

export default Meals;
