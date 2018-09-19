exports.up = async knex => {
  await knex.schema.createTable('users', table => {
    table.increments()
    table.string('email')
    table.string('code')
    table.string('password')
    table.string('salt')
  })

  await knex.schema.createTable('guests', table => {
    table.increments()
    table.integer('userId')
    table.string('firstName')
    table.string('lastName')
  })
}

exports.down = async knex => {
  await knex.schema.dropTable('users')
  await knex.schema.dropTable('guests')
}
