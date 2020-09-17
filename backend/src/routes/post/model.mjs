import knex from '../config/knex.mjs'

const getAll = async () => {
  return knex('post')
    .leftJoin('user_details', 'user_details.user', 'post.user')
    .select(
      'post.id',
      'post.title',
      'post.subtitle',
      'post.text',
      'post.photo',
      'user_details.name as user',
      'user_details.photo as userPhoto'
    )
}

const updatePhoto = async(path, id) => {
  return knex('post')
    .where('id', id)
    .update({
      photo: path
    })
}

const get = async (id) => {
  console.log(id)
  return knex('post')
    .where('id', id)
    .first()

}

const getUser = async (user) => {
  return knex('post')
    .leftJoin('user_details', 'user_details.user', 'post.user')
    .select(
      'post.id',
      'post.title',
      'post.subtitle',
      'post.text',
      'post.signed',
      'post.photo',
      'user_details.name as user',
      'user_details.photo as userPhoto'
    )
    .where('post.user', user)
}

const create = (post) => {
  return knex('post').insert({
    title: post.title,
    subtitle: post.subtitle,
    text: post.text,
    user: post.user
  }).returning(['id', 'title'])
}

const update = (id, post) => {
  return knex('post').update({
    title: post.title,
    subtitle: post.subtitle,
    text: post.text
  }).where('id', id)
  .returning(['id', 'title'])
}

const remove = (id) => {
  return knex('post')
    .where('id', id)
    .del()
}

export {
  updatePhoto,
  getAll,
  get,
  getUser,
  create,
  update,
  remove,
}
