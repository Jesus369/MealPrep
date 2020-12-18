export default `
    type Meal {
        id: ID!
        name: String!
        photo: String
        calories: Int
        carbs: Int
        fat: Int
        protein: Int
        users: [User!]!
        groceries: [Groceries!]!
    }

    type Query {
        getMeal(id: ID!): Meal!
        meals: [Meal!]!
    }

    type addMealRes {
        ok: Boolean!
    }

    type Mutation {
        createMeal(name: String!, photo: String!, calories: Int!, carbs: Int!, fat: Int!, protein: Int!): addMealRes!
    }
`;
