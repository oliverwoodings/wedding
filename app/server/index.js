const Router = require('express-promise-router')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const bodyParser = require('body-parser')
const schema = require('./schema')

const router = Router()

router.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
router.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

module.exports = router
