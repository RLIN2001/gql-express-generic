const typeDefs = `
  scalar JSON

  directive @auth on FIELD_DEFINITION

  type User {
    username: String
  }

  type Query {
    hello: String
    getUser: User
    getEntityData(entity: String!): EntityResponse @auth
    getEntityDataById(entity: String!, id: Int!): EntityResponse @auth
  }
  
  type Mutation {
    login(username: String!, password: String!): String
    logout: String @auth
    register(username: String!, password: String!): String
    deleteEntityById(entity: String!, id: Int!): EntityResponse @auth
    createEntityData(entity: String!, data: JSON!): EntityResponse @auth
    updateEntityData(entity: String!, id: Int!, data: JSON!): EntityResponse @auth
  }

  type EntityResponse {
    entity: String
    data: JSON
  }
`;

module.exports = typeDefs;
