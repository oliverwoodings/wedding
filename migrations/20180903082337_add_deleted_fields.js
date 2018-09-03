exports.up = async (knex) => {
  await knex.schema.table('users', (table) => {
    table.boolean('deleted').defaultTo(false)
  })
  await knex.schema.table('guests', (table) => {
    table.boolean('deleted').defaultTo(false)
  })
}

exports.down = async (knex) => {
  await knex.schema.table('users', (table) => {
    table.dropColumn('deleted')
  })
  await knex.schema.table('guests', (table) => {
    table.dropColumn('deleted')
  })
}
