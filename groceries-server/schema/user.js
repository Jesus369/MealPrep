export default `
    type User {
        id: ID!
        email: String
        username: String
        password: String
        firstname: String
        lastname: String
        meals: [Meal]
        lists: [List]
    }

    type Query {
        user(id: Int!): User!
        users: [User!]
    }

    type RegisterResponse {
        ok: Boolean!
        error: String
    }

    type LoginSuccess {
        ok: Boolean!
        token: String
        refreshToken: String
        error: String

    }

    type Mutation {
        registerUser(email: String!, username: String!, password: String!, firstname: String!, lastname: String!): RegisterResponse!
        login(email: String!, password: String!): LoginSuccess!
    }
`;
