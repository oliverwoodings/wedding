const Router = require('express-promise-router')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const graphqlOptions = require('./graphqlOptions')

const router = Router()

router.use('/graphql', bodyParser.json(), cookieParser(), graphqlExpress(graphqlOptions))
router.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

module.exports = router
