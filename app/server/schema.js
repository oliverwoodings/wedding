const fs = require('fs')
const path = require('path')
const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

module.exports = makeExecutableSchema({
  typeDefs: fs.readFileSync(path.resolve(__dirname, './schema.graphql'), 'utf8'),
  resolvers
})
