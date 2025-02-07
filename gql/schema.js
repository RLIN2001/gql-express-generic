const typeDefs = `
  scalar JSON

  type Query {
    hello: String
    getEntityData(entity: String!): EntityResponse
    getEntityDataById(entity: String!, id: Int!): EntityResponse
  }
  
  type Mutation {
    deleteEntityById(entity: String!, id: Int!): EntityResponse
    createEntityData(entity: String!, data: JSON!): EntityResponse
    updateEntityData(entity: String!, id: Int!, data: JSON!): EntityResponse
  }

  type EntityResponse {
    entity: String
    data: JSON
  }
`;

module.exports = typeDefs;
