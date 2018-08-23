exports.up = async (knex) => {
  await knex.schema.table('guests', (table) => {
    table.boolean('isChild').defaultTo(false)
  })
}

exports.down = async (knex) => {
  await knex.schema.table('guests', (table) => {
    table.dropColumns('isChild')
  })
}
