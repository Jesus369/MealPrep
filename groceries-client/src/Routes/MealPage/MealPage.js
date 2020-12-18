import React from "react";
import decode from "jwt-decode";
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_MEAL = gql`
  query GET_MEAL($id: ID!) {
    getMeal(id: $id) {
      id
      name
      calories
      protein
      fat
      carbs
      groceries {
        id
        name
      }
    }
  }
`;

const ADD_GROCERY_TO_LIST = gql`
  mutation ADD_GROCERY_TO_LIST($userId: Int!, $itemId: Int!) {
    addedGrocery(userId: $userId, itemId: $itemId) {
      ok
    }
  }
`;

const MealPage = ({ cookies } = this.props) => {
  const userId = decode(cookies.get("token")).access.id;

  const [addedGrocery, { groceryData }] = useMutation(ADD_GROCERY_TO_LIST);
  const { data = [], loading } = useQuery(GET_MEAL, {
    variables: {
      id: userId
    }
  });
  if (loading) return <div>Loading Meal Data</div>;

  let meal = data.getMeal;

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
            <li
              onClick={() => {
                addedGrocery({
                  variables: {
                    userId: userId,
                    itemId: g.id
                  }
                });
              }}
            >
              Add Grocery
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default MealPage;
