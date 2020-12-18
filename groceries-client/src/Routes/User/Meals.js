import React from "react";
import { Link } from "react-router-dom";

const Meals = ({ meals, userId } = this.props) => {
  if (!meals || meals.length == 0) {
    return <div className="empty_meals">START ADDING MEALS TO COOK UP</div>;
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
          <Link to={"/groceries/" + userId}>Add new tab</Link>
        </div>
      </div>
    );
  }
};

export default Meals;
