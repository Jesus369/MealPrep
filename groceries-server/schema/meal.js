export default `
    type Meal {
        id: ID!
        name: String!
        photo: String!
        calories: Int!
        carbs: Int!
        fat: Int!
        protein: Int!
        users: [User!]!
    }

    type Query {
        meals: [Meal!]!
    }

    type addMealRes {
        ok: Boolean!
    }

    type Mutation {
        addMeal(name: String!, photo: String!, calories: Int!, carbs: Int!, fat: Int!, protein: Int!): addMealRes!
    }
`;
