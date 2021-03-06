import React, { useState } from "react";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const ADD_NEW_MEAL = gql`
  mutation ADD_NEW_MEAL($userId: Int!, $mealId: Int!) {
    addMealtoUser(userId: $userId, mealId: $mealId) {
      ok
    }
  }
`;

const CREATE_MEAL = gql`
  mutation CREATE_MEAL(
    $name: String!
    $photo: String!
    $calories: Int!
    $carbs: Int!
    $fat: Int!
    $protein: Int!
    $sugar: Int!
  ) {
    createMeal(
      name: $name
      photo: $photo
      calories: $calories
      carbs: $carbs
      fat: $fat
      protein: $protein
      sugar: $sugar
    ) {
      ok
    }
  }
`;

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

// Meal Form Component
const NewMeal = ({ renderChange, userId } = this.props) => {
  const [meal, mealInput] = useState({
    name: "",
    photo: "",
    calories: "",
    carbs: "",
    fat: "",
    protein: "",
    sugar: "",
    newMeal: false
  });

  const { name, photo, calories, carbs, fat, protein, sugar } = meal;

  const [createMeal, { newMealData }] = useMutation(CREATE_MEAL);

  const changeMealData = e => {
    const { name, value } = e.target;
    mealInput({ ...meal, [name]: value });
  };
  return (
    <div className="new-meal-container">
      <span
      // onClick={() => {
      //   renderChange({ renderedState: "empty" });
      // }}
      ></span>
      <span
        onClick={() => {
          renderChange({ renderedState: "empty" });
        }}
        className="cancel-meal"
      >
        X
      </span>

      <div>
        <form
          className="new-meal-form"
          onSubmit={e => {
            createMeal({
              variables: {
                name: name,
                photo: photo,
                calories: parseInt(calories),
                carbs: parseInt(carbs),
                fat: parseInt(fat),
                protein: parseInt(protein),
                sugar: parseInt(sugar),
                newMeal: true
              }
            });
            e.preventDefault();
          }}
        >
          <span>Create New Meal!</span>
          <input
            name="name"
            value={meal.name}
            placeholder="Name"
            onChange={changeMealData}
          />
          <input
            name="photo"
            value={meal.photo}
            placeholder="Photo"
            onChange={changeMealData}
          />
          <input
            name="calories"
            value={meal.calories}
            placeholder="Calories"
            onChange={changeMealData}
          />
          <input
            name="carbs"
            value={meal.carbs}
            placeholder="Carbs"
            onChange={changeMealData}
          />
          <input
            name="fat"
            value={meal.fat}
            placeholder="Fat"
            onChange={changeMealData}
          />
          <input
            name="protein"
            value={meal.protein}
            placeholder="Protein"
            onChange={changeMealData}
          />
          <input
            name="sugar"
            value={meal.sugar}
            placeholder="Sugar"
            onChange={changeMealData}
          />
          <button className="submit-meal">Create</button>
        </form>
      </div>
    </div>
  );
};

const Meals = ({ meals, userIdProps } = this.props) => {
  const [rendered, changeRender] = useState({
    renderedState: "empty"
  });
  const [addMealtoUser, { addedMealData }] = useMutation(ADD_NEW_MEAL);

  if (!meals || meals.length == 0) {
    return (
      <div>
        {rendered.renderedState === "empty" ? (
          <EmptyMeals renderChange={changeRender} />
        ) : (
          <NewMeal userId={userIdProps} renderChange={changeRender} />
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
