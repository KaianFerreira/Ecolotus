import api from '../libs/api'

const getAll = async () => {
  const { data } = await api.get('post')
  return data
}

const getUserposts = async (user) => {
  const { data } = await api.get(`post/user/${user}`)
  return data
}

const get = async (id) => {
  const { data } = await api.get(`post/${id}`)
  return data
}

const create = async (post) => {
  const { data } = await api.post('post', post)
  return data
}

const update = async (id, post) => {
  const { data } = await api.put(`post/${id}`, post)
  return data
}

const remove = async (id) => {
  const { data } = await api.delete(`post/${id}`)
  return data
}


export {
  getAll,
  getAllAssigned,
  getUserposts,
  get,
  create,
  update,
  remove,
}
