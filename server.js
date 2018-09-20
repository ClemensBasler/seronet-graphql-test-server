var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var cors = require('cors')

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String,
    hi: String,
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  hi: () => {
    return 'Hi world';
  },
  rollDice: function ({numDice, numSides}) {
  var output = [];
  for (var i = 0; i < numDice; i++) {
    output.push(1 + Math.floor(Math.random() * (numSides || 6)));
  }
  return output;
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
