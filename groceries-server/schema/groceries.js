export default `
    type Groceries {
        id: Int!
        name: String!
        category: String!
        calories: Int!
        carbs: Int!
        protein: Int!
        fat: Int!
        sugar: Int!
        meals: [Meal!]!
    }

    type Query {
        grocery(id: ID!): Groceries!
        groceries: [Groceries!]!
        groceriesCat(category: String!): [Groceries!]!
        inlist(listId: Int!): [Groceries!]!
    }

    type newGroceryRes {
        ok: Boolean!
    }

    type groceryAddedRes {
        ok: Boolean!
    }

    type Mutation {
        createGrocery(name: String!, category: String!, calories: Int!, carbs: Int!, protein: Int!, fat: Int!, sugar: Int!): newGroceryRes!
        addedGrocery(listId: Int, userId: Int!, itemId: Int!): groceryAddedRes!
    }
`;
