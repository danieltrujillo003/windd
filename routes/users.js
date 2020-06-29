const { Router } = require('express')
const User = require('../models/User')

const router = Router()

const responseFormat = (data, error) => {
  // if (!Array.isArray(data)) data = [data]
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

router.post('/register', async (req, res) => {
  const { email, password } = req.body
  const newUser = new User({ email, password })
  await newUser.save((err, user) => {
    if (err) {
      res.send(responseFormat(null, err))
    } else {
      res.send(responseFormat(user))
    }
  })
})

router.put('/login', async (req, res) => {
  const { email, password } = req.body
  await User.findOne({ email, password }, 'email log', (err, user) => {
    if (err) {
      res.send(responseFormat(null, err))
    } else if (!user) {
      res.send(responseFormat(null, { message: 'invalid password or email'}))
    } else {
      user.log.push({ date: Date.now() })
      user.save((err, user) => {
        if (err) {
          res.send(responseFormat(null, err))
        } else {
          res.send(responseFormat({ key: user.email }))
        }
      })
    }
  })
})

router.delete('/delete', async (req, res) => {
  const { email } = req.body;
  await User.findOneAndDelete({ email }, (err, user) => {
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
      const { user, password } = req.body

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

router.get('/:email', async (req, res) => {
  const { email } = req.params
  await User.findOne({ email }, (err, user) => {
    if (err) {
      res.send(responseFormat(null, err))
    } else {
      res.send(responseFormat(user))
    }
  })
})

module.exports = router