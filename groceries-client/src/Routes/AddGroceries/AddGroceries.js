import React, { useState, useEffect } from "react";
import { gql, useLazyQuery, useQuery, useMutation } from "@apollo/client";
import "./styles/styles.css";

const FETCH_GROCERIES = gql`
  query FETCH_GROCERIES($category: String!) {
    groceriesCat(category: $category) {
      id
      name
    }
  }
`;

const ALL_GROCERIES = gql`
  query ALL_GROCERIES {
    groceries {
      id
      name
    }
  }
`;

const USER_ADDS_GROCERY = gql`
  mutation USER_ADDS_GROCERY($listId: Int!, $itemId: Int!) {
    addedGrocery(listId: $listId, itemId: $itemId) {
      ok
    }
  }
`;

const AddGroceries = () => {
  const [getCat, categoryData] = useLazyQuery(FETCH_GROCERIES);
  const { data = [], loading } = useQuery(ALL_GROCERIES);
  const [getBoolean, setBoolean] = useState({ boolean: true });

  const [groceryValues, setGroceryValues] = useState({
    listId: 0,
    itemId: 0
  });

  //   Adding a grocery item to the user's list
  const { listId, itemId } = groceryValues;
  const [addedGrocery, { mutationData }] = useMutation(USER_ADDS_GROCERY, {
    variables: {
      listId: listId,
      itemId: itemId
    }
  });

  let categories = [
    { name: "All" },
    { name: "Vegetable" },
    { name: "Fruit" },
    { name: "Isle" },
    { name: "Frozen" },
    { name: "Meat" },
    { name: "Bakery" }
  ];

  if (loading || categoryData.loading) return <div>Loading Groceries</div>;

  return (
    <div>
      <div className="sortby">
        {categories.map(c => (
          <ul>
            <li
              onClick={() => {
                if (c.name === "All") {
                  setBoolean({ boolean: true });
                } else {
                  setBoolean({ boolean: false });
                  getCat({ variables: { category: c.name } });
                  console.log(categoryData.data);
                }
              }}
            >
              {" "}
              {c.name}{" "}
            </li>
          </ul>
        ))}
      </div>
      <div className="select_groceries">
        {categoryData.data && getBoolean.boolean === false
          ? categoryData.data.groceriesCat.map(g => (
              <ul>
                <li
                  onClick={() => {
                    let groceryId = g.id;
                    console.log(groceryId);
                  }}
                >
                  {g.name}{" "}
                </li>
                <li onClick={() => {}}>Add Item </li>
              </ul>
            ))
          : data.groceries.map(grocery => (
              <ul>
                <li
                  onClick={() => {
                    let groceryId = grocery.id;
                    console.log(groceryId);
                  }}
                >
                  {" "}
                  {grocery.name}{" "}
                </li>
                <li>Add Item</li>
              </ul>
            ))}
      </div>
    </div>
  );
};

export default AddGroceries;
