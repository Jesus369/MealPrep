export default `
    type List {
        id: ID!
        name: String!
        groceries: [Groceries!]!
        grocery: Groceries!
    }

    type Query {
        allLists: [List!]!
        usersGrcryLst(listId: Int!): List!
    }

    type newListRes {
        ok: Boolean!
    }

    type loginSuccess {
        ok: Boolean!
    }

    type Mutation {
        newList(name: String!, userId: Int!): newListRes!
        loginUser(username: String!, password: String!): loginSuccess!
    }
`;
