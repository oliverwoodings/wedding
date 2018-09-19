exports.up = async knex => {
  await knex.schema.table('users', table => {
    table.string('address')
  })
}

exports.down = async knex => {
  await knex.schema.table('users', table => {
    table.dropColumn('address')
  })
}
