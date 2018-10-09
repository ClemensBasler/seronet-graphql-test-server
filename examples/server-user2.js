var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var cors = require('cors')

// Construct a schema, using GraphQL schema language
var schema = buildSchema(
`
type User {
  id: String
  name: String
}

type Query {
  user(id: String): User
  users(listId: [String!]): [User!]
}
`);

// The root provides a resolver function for each API endpoint
// Maps id to User object
var fakeDatabase = {
  'a': {
    id: 'a',
    name: 'alice',
  },
  'b': {
    id: 'b',
    name: 'bob',
  },
};

var users = {};

var root = {
  user: function ({id}) {
    return fakeDatabase[id];
  }
};

var app = express();
// app.use(cors());
app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
