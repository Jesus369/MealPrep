import React, { useState, useEffect } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import "./styles/styles.css";

const FETCH_GROCERIES = gql`
  query FETCH_GROCERIES($category: String!) {
    groceriesCat(category: $category) {
      name
    }
  }
`;

const ALL_GROCERIES = gql`
  query ALL_GROCERIES {
    groceries {
      name
    }
  }
`;

const AddGroceries = () => {
  const [getCat, categoryData] = useLazyQuery(FETCH_GROCERIES);
  const { data = [], loading } = useQuery(ALL_GROCERIES);
  const [getBoolean, setBoolean] = useState({ boolean: true });

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
                <li>{g.name} </li>
              </ul>
            ))
          : data.groceries.map(grocery => (
              <ul>
                <li> {grocery.name} </li>
              </ul>
            ))}
      </div>
    </div>
  );
};

export default AddGroceries;
