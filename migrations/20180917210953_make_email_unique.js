exports.up = async (knex) => {
  await knex.schema.table('users', (table) => {
    table.unique('email')
  })
}

exports.down = async (knex) => {
  await knex.schema.table('users', (table) => {
    table.dropUnique('email')
  })
}
