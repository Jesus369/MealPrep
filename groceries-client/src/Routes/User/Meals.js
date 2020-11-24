import React from "react";

const Meals = ({ meals } = this.props) => {
  if (meals.length <= 0) {
    return <div className="empty_meals">gets to creating a meal!</div>;
  }
  return (
    <div className="meals_listing">
      {meals.map(m => (
        <ul className="meal">
          <li>{m.photo}</li>
          <li>{m.name}</li>
        </ul>
      ))}
    </div>
  );
};

export default Meals;
