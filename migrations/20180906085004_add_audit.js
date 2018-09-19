exports.up = async knex => {
  await knex.schema.createTable('audit', table => {
    table.increments()
    table.datetime('createdAt')
    table.integer('userId')
    table.string('action')
    table.specificType('meta', 'JSON').notNullable()
  })
}

exports.down = async knex => {
  await knex.schema.dropTable('audit')
}
