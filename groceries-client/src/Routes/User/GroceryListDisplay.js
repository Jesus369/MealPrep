import React, { Component } from "react";

import { gql, useQuery } from "@apollo/client";

const USER_GROCERIES = gql`
  query USER_GROCERIES($userId: Int!) {
    lists(userId: $userId) {
      name
    }
  }
`;

const GroceryListDisplay = ({ userId } = this.props) => {
  const { data = [], loading } = useQuery(USER_GROCERIES, {
    variables: {
      userId: userId
    }
  });

  if (loading) return <div>Fetching Your Meals</div>;

  return (
    <div>
      {data.lists.length == 0 ? (
        <div>Build Your Meals!</div>
      ) : (
        data.lists.map(d => <div>{d.name}</div>)
      )}
    </div>
  );
};

export default GroceryListDisplay;
