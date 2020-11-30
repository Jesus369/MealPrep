import React from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import "./styles/styles.css";
const FETCH_GROCERIES = gql`
  query FETCH_GROCERIES($category: String!) {
    groceriesCat(category: $category) {
      name
    }
  }
`;

const AddGroceries = () => {
  let selectedCat = "Vegetable";
  const [getCat, { loading, data }] = useLazyQuery(FETCH_GROCERIES);

  let categories = [
    { name: "All" },
    { name: "Vegetable" },
    { name: "Fruit" },
    { name: "Isle" },
    { name: "Frozen" },
    { name: "Meat" },
    { name: "Bakery" }
  ];

  if (loading) return <div>Loading The Groceries</div>;

  return (
    <div>
      <div className="sortby">
        {categories.map(c => (
          <ul>
            <li
              onClick={() => {
                console.log(c.name);
                getCat({ variables: { category: c.name } });
                console.log(data);
              }}
            >
              {" "}
              {c.name}{" "}
            </li>
          </ul>
        ))}
      </div>
      <div className="select_groceries">
        {data && data.groceriesCat ? (
          data.groceriesCat.map(g => (
            <ul>
              <li>{g.name} </li>
            </ul>
          ))
        ) : (
          <div>NoPets</div>
        )}
      </div>
    </div>
  );
};

export default AddGroceries;
