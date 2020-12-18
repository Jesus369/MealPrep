import React from "react";
import decode from "jwt-decode";
import { gql, useQuery } from "@apollo/client";

const GET_MEAL = gql`
  query GET_MEAL($id: ID!) {
    getMeal(id: $id) {
      name
      calories
      protein
      fat
      carbs
      groceries {
        name
      }
    }
  }
`;

const MealPage = ({ cookies } = this.props) => {
  const userId = decode(cookies.get("token")).access.id;

  const { data = [], loading } = useQuery(GET_MEAL, {
    variables: {
      id: userId
    }
  });
  if (loading) return <div>Loading Meal Data</div>;
  console.log(data.getMeal);
  let meal = data.getMeal;
  console.log(meal.groceries);
  return (
    <div>
      <span>{meal.name}</span>
      <ul>
        <li> Calories: {meal.calories ? meal.calories : 0} </li>
        <li> Protein: {meal.protei ? meal.protein : 0} </li>
        <li> Fat: {meal.fat ? meal.fat : 0} </li>
        <li> Carbs: {meal.carbs ? meal.carbs : 0} </li>
      </ul>
      <div>
        <span>Ingredients</span>
        {meal.groceries.map(g => (
          <ul>
            <li>{g.name}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default MealPage;
