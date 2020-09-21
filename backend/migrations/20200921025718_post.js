
exports.up = function(knex) {
  return Promise.all([
    knex.schema.alterTable('post', table => {
      table.date('publishDate').comment('Data de publicação')
    })
  ])
}

exports.down = function(knex) {
  return Promise.all([
    knex.schema.alterTable('post', table => {
      table.dropColumn('publishDate')
    })
  ])
}
