export default `
    type mergeMealListRes {
        ok: Boolean!
    }
    
    type Mutation {
        mergeMealandItems(mealId: Int!, itemId: Int!): mergeMealListRes!
    }
`;
