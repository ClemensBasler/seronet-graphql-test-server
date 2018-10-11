// @ts-check
import { find, propEq, compose } from 'ramda'
const findById = compose(find, propEq('componentId'))

export const Query = {
  info: () => 'This is a public GraphQL API for SeRoNet',
  getDatasheet: (parent, args, context) => {
    const { db } = context
    const { componentId } = args
    return findById(componentId)(db)
  }
}
