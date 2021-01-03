export default `
    type Meal {
        id: ID!
        name: String!
        photo: String
        calories: Int
        carbs: Int
        fat: Int
        protein: Int
        sugar: Int
        users: [User!]!
        groceries: [Groceries!]!
    }

    type Query {
        getMeal(id: ID!): Meal!
        meals: [Meal!]!
        randomMeals: [Meal!]!
    }

    type addMealRes {
        ok: Boolean!
    }

    type Mutation {
        createMeal(name: String!, photo: String!, calories: Int!, carbs: Int!, fat: Int!, protein: Int! sugar: Int!): addMealRes!
        createCustomMeal(name: String!, photo: String!, calories: Int!, carbs: Int!, fat: Int!, protein: Int! sugar: Int!, userId: Int!): addMealRes!

    }
`;
