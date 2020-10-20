import React, { Component } from "react";

import { gql, useQuery } from "@apollo/client";

const FETCH_USER = gql`
  query FETCH_USER($id: Int!) {
    user(id: $id) {
      email
      firstname
      lastname
    }
  }
`;

const Account = ({ match } = this.props) => {
  const { data = [], loading } = useQuery(FETCH_USER, {
    variables: {
      id: parseInt(match.params.userId)
    }
  });
  console.log(data);

  return <div>Account Page</div>;
};

export default Account;
