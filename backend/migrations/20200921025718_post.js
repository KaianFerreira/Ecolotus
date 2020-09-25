
exports.up = function(knex) {
  return Promise.all([
    knex.schema.alterTable('post', table => {
      table.string('publish_date').comment('Data de publicação')
    })
  ])
}

exports.down = function(knex) {
  return Promise.all([
    knex.schema.alterTable('post', table => {
      table.dropColumn('publish_date')
    })
  ])
}
