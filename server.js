import express from 'express'
import graphqlHTTP from 'express-graphql'
var graphql  = require('graphql');
var cors = require('cors')

// The root provides a resolver function for each API endpoint
// Maps id to User object
var fakeDatabase = [
  {
    id: 'rb-1-base',
    name: 'RB-1 BASE',
    weight: 30,
    processor: '4th generation Intel i7',
    link: 'https://www.robotnik.eu/web/wp-content/uploads//2015/11/Robotnik_DATASHEET_RB-1-BASE_EN.pdf',
    image: 'https://www.robotnik.eu/web/wp-content/uploads//2014/03/logo.jpg',
  },
  {
  id: 'rb-2-base',
  name: 'RB-2 BASE',
  weight: 50,
  processor: '4th generation Intel i5',
  link: 'https://www.robotnik.eu/web/wp-content/uploads//2015/11/Robotnik_DATASHEET_RB-1-BASE_EN.pdf',
  image: 'https://www.robotnik.eu/web/wp-content/uploads//2014/03/logo.jpg',
  }
];

// var fakeDatabase = [
//   {
//     id: 'rb-1-base',
//     name: 'RB-1 BASE',
//     weight: 30,
//     processor: {
//       name:
//     }
//     link: 'https://www.robotnik.eu/web/wp-content/uploads//2015/11/Robotnik_DATASHEET_RB-1-BASE_EN.pdf',
//     image: 'https://www.robotnik.eu/web/wp-content/uploads//2014/03/logo.jpg',
//   }
// ];

// Define the User type
var componentType = new graphql.GraphQLObjectType({
  name: 'component',
  fields: {
    name: { type: graphql.GraphQLString },
    weight: { type: graphql.GraphQLInt },
    link: { type: graphql.GraphQLString },
    image: { type: graphql.GraphQLString },
    processor: { type: graphql.GraphQLString }
  }
});

// Define the User type
var componentType2 = new graphql.GraphQLObjectType({
  name: 'component2',
  fields: {
    id: { type: graphql.GraphQLString },
    sections: {
      name: { type: graphql.GraphQLString },
      fields: {
        name: { type: graphql.GraphQLString },
        value: { type: graphql.GraphQLString },
        type: { type: graphql.GraphQLString }
      }
  }
}
});

var componentListType = new graphql.GraphQLList(componentType);

// Define the Query type
var queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    component: {
      type: componentType,
      // `args` describes the arguments that the `user` query accepts
      args: {
        id: { type: graphql.GraphQLString }
      },
      resolve: function (_, {id}) {
        for (var variable in fakeDatabase) {
          // console.log(variable);
          if (fakeDatabase[variable].id == id) {
            return fakeDatabase[variable]
          }
        }
      }
    },
    componentList: {
      type: componentListType,
      resolve: function (_) {
        return fakeDatabase;
      }
    },
  }
});

// // Define the Query type
// var queryType = new graphql.GraphQLObjectType({
//   name: 'Query',
//   fields: {
//     user: {
//       type: userType,
//       // `args` describes the arguments that the `user` query accepts
//       args: {
//         id: { type: graphql.GraphQLString }
//       },
//       resolve: function (_, {id}) {
//         return fakeDatabase[id];
//       }
//     }
//   }
// });

var schema = new graphql.GraphQLSchema({query: queryType});

var app = express();
app.use(cors());
app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
