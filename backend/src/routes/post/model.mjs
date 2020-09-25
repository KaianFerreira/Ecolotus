import knex from '../config/knex.mjs'

const getAll = async () => {
  return knex('post')
    .leftJoin('user_details', 'user_details.user', 'post.user')
    .select(
      'post.id',
      'post.title',
      'post.subtitle',
      'post.text',
      'post.publishDate as publishDate',
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
  return knex('post')
    .leftJoin('user_details', 'user_details.user', 'post.user')
    .select(
      'post.id',
      'post.title',
      'post.subtitle',
      'post.text',
      'post.publishDate',
      'post.photo',
      'user_details.user as userId',
      'user_details.name as user',
      'user_details.photo as userPhoto'
    )
    .where('post.id', id)
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

const create = (
  title,
  subtitle,
  text,
  publishDate,
  user,
) => {
  return knex('post').insert({
    title,
    subtitle,
    text,
    user,
    publishDate
  }).returning(['id', 'title'])
}

const update = (
  id,
  title,
  subtitle,
  text,
) => {
  return knex('post').update({
    title,
    subtitle,
    text
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
