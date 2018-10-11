// @ts-check

import { GraphQLServer } from 'graphql-yoga'
import cors from 'cors'
import resolvers from './resolvers'
import typeDefs from './schema'

// controlled by a ENV variable "STAGE" from .env file
const isProductionEndpoint = () => process.env.STAGE === 'production'

// @ts-ignore
const fakeDatabase = require('./fakedb.json')

// @ts-ignore
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  // schemaDirectives: {
  //   constraint
  //   // isAuthenticated
  // },
  context: req => ({ ...req, db: fakeDatabase })
})

server.use(cors())
server.start(
  {
    playground: isProductionEndpoint() ? false : '/'
  },
  ({ port }) => {
    console.log(`Server is running on http://localhost:${port}`)
  }
)
