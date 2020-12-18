import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const FETCH_MEALS = gql`
  query FETCH_MEALS {
    meals {
      id
      name
    }
  }
`;

const AllLists = () => {
  const { data = [], loading } = useQuery(FETCH_MEALS, {
    pollInterval: 500
  });

  if (loading) return <div>...Loading Data</div>;

  if (!data.meals) {
    return <div>No Data To Load</div>;
  }
  return (
    <div>
      {data.meals.map(meal => (
        <Link to={"/" + meal.name + "/" + meal.id} key={"food " + meal.id}>
          {meal.name}
        </Link>
      ))}
    </div>
  );
};

export default AllLists;
