import React, { Component } from 'react'
import axios from 'axios'

export default function withQuery (
  Query,
  { mapPropsToVariables, name = 'query', lazy = false } = {}
) {
  return InnerComponent => {
    return class WithQuery extends Component {
      state = {
        isPending: false,
        isRefetching: false,
        hasFailed: false,
        data: null,
        hasExecuted: false,
        lastVariables: {}
      }

      componentWillMount () {
        if (!lazy) {
          this.execute()
        }
      }

      componentWillUnmount () {
        this.cancelled = true
      }

      async execute (additionalVariables) {
        if (this.state.isPending) {
          return
        }

        const mappedVariables = mapPropsToVariables
          ? mapPropsToVariables(this.props)
          : {}
        const variables = {
          ...mappedVariables,
          ...additionalVariables
        }

        this.setState({
          isPending: true,
          isRefetching: this.state.hasExecuted,
          hasExecuted: true,
          lastVariables: variables
        })

        try {
          const { data, errors } = await runQuery(Query, variables)
          this.setState({
            isPending: false,
            data,
            error: errors && errors[0],
            hasFailed: !!errors
          })
          return data
        } catch (e) {
          if (!this.cancelled) {
            this.setState({
              data: null,
              isPending: false,
              hasFailed: true,
              error: {
                message: e.message,
                stack: e.stack
              }
            })
          }
        }
      }

      render () {
        return React.createElement(InnerComponent, {
          ...this.props,
          [name]: {
            ...this.state,
            haveVariablesChanged: ::this.haveVariablesChanged,
            execute: ::this.execute
          }
        })
      }

      haveVariablesChanged (toCheck) {
        return Object.keys(toCheck).some(keyToCheck => {
          return toCheck[keyToCheck] !== this.state.lastVariables[keyToCheck]
        })
      }
    }
  }
}

async function runQuery (query, variables) {
  const { data } = await axios.post(
    '/graphql',
    {
      query,
      variables
    },
    { withCredentials: true }
  )

  return data
}
