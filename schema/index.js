// @ts-check
// NOTE: do not edit this file, it provides automated loading of modularized schemas

import { join } from 'path'
import { fileLoader, mergeTypes } from 'merge-graphql-schemas'
import { importSchema } from 'graphql-import'

const typesArray = fileLoader(join(__dirname, './'))

// we need this because mergeTypes does not follow schema imports
const joinedTypes = typesArray.join('\n')
const imported = importSchema(joinedTypes)

export default mergeTypes([imported])
