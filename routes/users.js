const { Router } = require('express')
const User = require('../models/User')

const router = Router()

const responseFormat = (data, error) => {
  if (!Array.isArray(data)) data = [data]
  return {
    res: {
      success: !error,
      data,
      error: error && {
        title: error.name,
        message: error.message
      }
    }
  }
}

router.get('/getsingle/:id', async (req, res) => {
  const { id } = req.params
  await User.findById(id, (err, user) => {
    if (err) {
      res.send(responseFormat(null, err))
    } else {
      res.send(responseFormat(user))
    }
  })
})

router.post('/add', async (req, res) => {
  const { name, user, password } = req.body
  const newUser = new User({ name, user, password })
  await newUser.save((err, user) => {
    if (err) {
      res.send(responseFormat(null, err))
    } else {
      res.send(responseFormat(user))
    }
  })
})

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id, (err, user) => {
    if (err) {
      res.send(responseFormat(null, err))
    } else {
      res.send(responseFormat(user))
    }
  })
})

router.put('/update/:id', async (req, res) => {
  const { id } = req.params
  await User.findById(id, (err, userToUpdate) => {
    if (err) {
      res.send(responseFormat(null, err))
    } else {
      const { name, user, password } = req.body

      if(name) userToUpdate.name = name
      if(user) userToUpdate.user = user
      if(password) userToUpdate.password = password

      userToUpdate.save((err, user) => {
        if (err) {
          res.send(responseFormat(null, err))
        } else {
          res.send(responseFormat(user))
        }
      })
    }
  })
})

module.exports = router