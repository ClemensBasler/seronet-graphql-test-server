var express = require('express')
var graphqlHTTP = require('express-graphql')
var { buildSchema } = require('graphql')
var cors = require('cors')

// Construct a schema, using GraphQL schema language
var schema = buildSchema(
  `
type RandomDie {
  numSides: Int!
  rollOnce: Int!
  roll(numRolls: Int!): [Int]
}

type Query {
  getDie(numSides: Int): RandomDie
}
`
)

class RandomDie {
  constructor (numSides) {
    this.numSides = numSides
  }

  rollOnce () {
    return 1 + Math.floor(Math.random() * this.numSides)
  }

  roll ({ numRolls }) {
    var output = []
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce())
    }
    return output
  }
}

// The root provides a resolver function for each API endpoint
var root = {
  getDie: function ({ numSides }) {
    return new RandomDie(numSides || 6)
  }
}

var app = express()
// app.use(cors());
app.use(
  '/graphql',
  cors(),
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
)
app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000/graphql')
