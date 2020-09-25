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

const create = async (
  publishDate,
  title,
  subTitle,
  text,
  photo
) => {
  const formData = new FormData()
  if (publishDate) formData.append('publishDate', publishDate)
  if (title) formData.append('title', title)
  if (subTitle) formData.append('subTitle', subTitle)
  if (text) formData.append('text', text)
  if (photo) formData.append('photo', photo)
  const { data } = await api.post(`post`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  return data
}

const update = async (
  id,
  title,
  subTitle,
  text,
  photo
) => {
  const formData = new FormData()
  if (title) formData.append('title', title)
  if (subTitle) formData.append('subTitle', subTitle)
  if (text) formData.append('text', text)
  if (photo) formData.append('photo', photo)
  const { data } = await api.put(`post/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  return data
}

const remove = async (id) => {
  const { data } = await api.delete(`post/${id}`)
  return data
}


export {
  getAll,
  getUserposts,
  get,
  create,
  update,
  remove,
}
