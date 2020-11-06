import React, { Component } from "react";

import Header from "../../Components/Header";
import GroceryListDisplay from "./GroceryListDisplay";

import { withRouter } from "react-router-dom";

import { gql, useQuery } from "@apollo/client";
import { render } from "react-dom";

const FETCH_USER = gql`
  query FETCH_USER($id: Int!) {
    user(id: $id) {
      email
      firstname
      lastname
    }
  }
`;

const Account = (
  { userId, history, cookies, match: { params } } = this.props
) => {
  const { data = [], loading } = useQuery(FETCH_USER, {
    variables: {
      id: parseInt(params.userId)
    }
  });

  if (loading) return <div>...Loading Data</div>;

  if (userId != parseInt(params.userId)) {
    history.push("/home");
  }
  return (
    <div>
      <Header setCookies={cookies} />
      <ul>
        <li> {data.user.email} </li>
        <li> {data.user.firstname} </li>
        <li> {data.user.lastname} </li>
      </ul>

      <div>
        <ul>
          <li>Grocery List</li>
          <li>Meals</li>
        </ul>
      </div>

      <div>
        <GroceryListDisplay userId={parseInt(params.userId)} />
      </div>
    </div>
  );
};

export default withRouter(Account);
