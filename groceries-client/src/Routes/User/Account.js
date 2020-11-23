import React from "react";

import { withRouter } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import Header from "../../Components/Header";
import GroceryListDisplay from "./GroceryListDisplay";
import Calendar from "./Calendar";
import Meals from "./Meals";

import "./Styles/styles.css";

const FETCH_USER = gql`
  query FETCH_USER($id: Int!) {
    user(id: $id) {
      email
      firstname
      lastname
      meals {
        name
      }
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

  //   Push user home if Account Page ParamsID does not = to logged in UserID
  if (userId !== parseInt(params.userId)) {
    history.push("/home");
  }

  if (data) {
    return (
      <div>
        <Header setCookies={cookies} />
        <Calendar />
        <div className="meals_container">
          <Meals meals={data.user.meals} />
        </div>

        <div>
          <GroceryListDisplay userId={parseInt(params.userId)} />
        </div>
      </div>
    );
  }
};

export default withRouter(Account);
