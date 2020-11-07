import React from "react";
import { gql, useQuery } from "@apollo/client";

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
  return (
    <div>
      {data.meals.map(m => (
        <div key={"food " + m.id}>{m.name}</div>
      ))}
    </div>
  );
};

export default AllLists;
