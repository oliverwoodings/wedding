exports.up = async (knex) => {
  await knex.schema.table('users', (table) => {
    table.boolean('eveningOnly').defaultTo(false)
  })
}

exports.down = async (knex) => {
  await knex.schema.table('users', (table) => {
    table.dropColumn('eveningOnly')
  })
}
