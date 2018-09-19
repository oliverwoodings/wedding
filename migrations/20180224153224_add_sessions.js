exports.up = async knex => {
  await knex.schema.createTable('sessions', table => {
    table.integer('userId')
    table.string('key')
    table.dateTime('createdAt')
  })
}

exports.down = async knex => {
  await knex.schema.dropTable('sessions')
}
