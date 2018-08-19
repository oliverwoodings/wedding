exports.up = async (knex) => {
  await knex.schema.table('guests', (table) => {
    table.boolean('isAttending')
    table.boolean('hasDietaryRequirements').defaultTo(false)
    table.text('dietaryRequirements')
  })
}

exports.down = async (knex) => {
  await knex.schema.table('guests', (table) => {
    table.dropColumns(
      'isAttending',
      'hasDietaryRequirements',
      'dietaryRequirements'
    )
  })
}
