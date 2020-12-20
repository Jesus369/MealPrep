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
        addMealtoUser(userId: Int!, mealId: Int!): userMealRes!
    }
`;
