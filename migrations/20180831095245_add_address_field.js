exports.up = async (knex) => {
  await knex.schema.table('users', (table) => {
    table.boolean('address').defaultTo(false)
  })
}

exports.down = async (knex) => {
  await knex.schema.table('users', (table) => {
    table.dropColumn('address')
  })
}
