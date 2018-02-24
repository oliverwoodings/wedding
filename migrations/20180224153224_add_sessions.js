exports.up = async (knex) => {
  await knex.schema.createTable('sessions', (table) => {
    table.integer('userId')
    table.string('key')
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTable('sessions')
}
