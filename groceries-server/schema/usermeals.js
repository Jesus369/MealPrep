export default `
    type UserMeal {
        id: ID!
        userId: Int!
        mealId: Int!
    }

    type userMealRes {
        ok: Boolean!
    }

    type Mutation {
        userMealsMerge(user_id: Int!, meal_id: Int!): userMealRes!
    }
`;
