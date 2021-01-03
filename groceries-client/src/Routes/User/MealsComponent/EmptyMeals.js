import React from "react";

// Empty Meals Component
const EmptyMeals = ({ renderChange } = this.props) => {
  return (
    <div className="empty_meals">
      <span
        onClick={() => {
          renderChange({ renderedState: "add" });
        }}
      >
        Add A Meal
      </span>
    </div>
  );
};

export default EmptyMeals;
