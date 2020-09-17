import express from 'express'
import Joi from 'joi'
import requireAuth from '../config/auth/requireAuth.mjs'
import multer from 'multer'
import fs from 'fs'
import {
  get,
  getAll,
  create,
  update,
  remove,
} from './model.mjs'

const router = express.Router()
const upload = multer({ dest: `${process.env.FOLDER_DATA}/tmp`})

const uploadPhoto = (file, id) => {
  if (file) {
    // If folder does not exists
    if (!fs.existsSync(`${process.env.FOLDER_DATA}/posts/${id}`)) {
      fs.mkdirSync(`${process.env.FOLDER_DATA}/posts/${id}`, { recursive: true })
    }
    // If photo exists
    if (fs.existsSync(`${process.env.FOLDER_DATA}/posts/${id}/background.jpg`)) {
      fs.unlinkSync(`${process.env.FOLDER_DATA}/posts/${id}/background.jpg`)
    }
    // Copy temp image to business folder
    fs.copyFileSync(`${process.env.FOLDER_DATA}/tmp/${file.filename}`, `${process.env.FOLDER_DATA}/posts/${id}/background.jpg`)
    fs.unlinkSync(`${process.env.FOLDER_DATA}/tmp/${file.filename}`)
  }
}


router.get('/', requireAuth(), async (req, res) => {
  try {
    console.log('GET /note')
    // Validate request
    const notes = await getAll()
    res.send(notes)
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/:id', requireAuth(), async (req, res) => {
  try {
    console.log('GET /note/:id')
    const schema = Joi.object().keys({
      id: Joi.number().integer().required()
    })
    const { value, error } = schema.validate(req.params)
    if (error) {
      console.log(error.details[0].message)
      return res.status(400).send({ error: 'Validation error', fields: ['id'] })
    }
    const note = await get(value.id)
    res.send(note)
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: 'Internal error'})
  }
})

// Check if user exists
router.post('/',  requireAuth('user'), upload.single('photo'), async (req, res) => {
  try {
    console.log('POST /note')
    const schema = Joi.object().options({ abortEarly: false }).keys({
      title: Joi.string().required(),
      subtitle: Joi.string().required(),
      text: Joi.string().required(),
      photo: Joi.any().allow(null),
    })
    // Validate request
    const { value, error } = schema.validate(req.body)
    if (error) {
      console.log(error.details[0].message)
      return res.status(400).send({ error: 'Validation error', fields: [...error.details.map(x => x.path[0])] })
    }
    value.user = req.user.id
    const note = await create(value)
    uploadPhoto(req.photo, note)
    await updatePhoto (req.file ? `${process.env.API_DATA}/posts/${note}/background.jpg` : null, note)
    res.send(note)
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.put('/:id', requireAuth('user'), async (req, res) => {
  try {
    console.log('PUT /note/:id')
    // Validate request
    const paramsSchema = Joi.object().keys({
      id: Joi.number().integer().required()
    })
    const param = paramsSchema.validate(req.params)

    if (param.error) {
      console.error(param.error.details[0].message)
      return res.status(400).send({ error: 'Validation error', fields: ['id'] })
    }
    const bodySchema =Joi.object().options({abortEarly: false}).keys({
      title: Joi.string().required(),
      subtitle: Joi.string().required(),
      text: Joi.string().required(),
      photo: Joi.any().allow(null),
    })
    const body = bodySchema.validate(req.body)

    if (body.error) {
      console.log(body.error.details[0].message)
      return res.status(400).send({ error: 'Validation error', fields: [...body.error.details.map(x => x.path[0])] })
    }
    const note = await update(param.value.id, body.value)
    uploadPhoto(req.photo, note)
    await updatePhoto (req.file ? `${process.env.API_DATA}/posts/${note}/background.jpg` : null, note)
    return res.send(note)
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.delete('/:id', requireAuth('user'), async (req, res) => {
  try {
    console.log('DELETE /note/:id')
    const schema = Joi.object().keys({
      id: Joi.number().integer().required()
    })
    const { value, error } = schema.validate(req.params)
    if (error) {
      console.log(error.details[0].message)
      return res.status(400).send({ error: 'Validation error', fields: ['id'] })
    }
    await remove(value.id)
    res.send(true)
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: 'Internal error'})
  }
})

export default router
