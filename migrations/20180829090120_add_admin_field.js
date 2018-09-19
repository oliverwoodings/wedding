exports.up = async knex => {
  await knex.schema.table('users', table => {
    table.boolean('isAdmin').defaultTo(false)
  })
}

exports.down = async knex => {
  await knex.schema.table('users', table => {
    table.dropColumn('isAdmin')
  })
}
