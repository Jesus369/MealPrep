import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const NEW_CUSTOM_MEAL = gql`
  mutation NEW_CUSTOM_MEAL(
    $name: String!
    $photo: String!
    $calories: Int!
    $carbs: Int!
    $fat: Int!
    $protein: Int!
    $sugar: Int!
    $userId: Int
  ) {
    createCustomMeal(
      name: $name
      photo: $photo
      calories: $calories
      carbs: $carbs
      fat: $fat
      protein: $protein
      sugar: $sugar
      userId: $userId
    ) {
      ok
    }
  }
`;
// Meal Form Component
const NewCustomMeal = ({ renderChange, userId } = this.props) => {
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

  const [createCustomMeal, { customMealData }] = useMutation(NEW_CUSTOM_MEAL);

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
            createCustomMeal({
              variables: {
                name: name,
                photo: photo,
                calories: parseInt(calories),
                carbs: parseInt(carbs),
                fat: parseInt(fat),
                protein: parseInt(protein),
                sugar: parseInt(sugar),
                userId: parseInt(userId),
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

export default NewCustomMeal;
