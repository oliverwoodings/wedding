import withQuery from './withQuery'

export default function withMutation (Mutation, opts = {}) {
  return withQuery(Mutation, {
    name: 'mutation',
    lazy: true,
    ...opts
  })
}
