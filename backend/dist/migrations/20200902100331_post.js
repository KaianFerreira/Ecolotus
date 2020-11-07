
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('post', table => {
      table.increments().comment('Id da postagem'),
      table.integer('user').comment('id usuario')
      table.foreign('user').references('user.id').onDelete('CASCADE')
      table.string('title').comment('Titulo')
      table.string('photo').comment('Foto da postagem')
      table.text('subtitle').comment('Subtitulo')
      table.text('text').comment('Texto')
    })
  ])
}

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTableIfExists('post')
  ])
}
