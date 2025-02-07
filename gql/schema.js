const typeDefs = `
  scalar JSON

  type User {
    username: String
  }

  type Query {
    hello: String
    getUser: User
    getEntityData(entity: String!): EntityResponse
    getEntityDataById(entity: String!, id: Int!): EntityResponse
  }
  
  type Mutation {
    login(username: String!, password: String!): String
    logout: String
    register(username: String!, password: String!): String
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
