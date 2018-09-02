exports.up = async (knex) => {
  await knex.schema.table('users', (table) => {
    table.string('group')
  })
}

exports.down = async (knex) => {
  await knex.schema.table('users', (table) => {
    table.dropColumn('group')
  })
}
