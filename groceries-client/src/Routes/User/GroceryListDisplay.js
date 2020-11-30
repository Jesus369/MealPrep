import React from "react";

import { gql, useQuery } from "@apollo/client";

const GroceryListDisplay = ({ userId, lists } = this.props) => {
  if (!lists || lists.length === 0) {
    return (
      <div className="empty_groceries">
        YOU HAVE NO GROCERIES TO GO SHOP FOR
      </div>
    );
  } else {
    return (
      <div className="groceries_prelist">
        {lists.map(l => (
          <ul>
            <li>{l.name}</li>
          </ul>
        ))}
      </div>
    );
  }
};

export default GroceryListDisplay;
