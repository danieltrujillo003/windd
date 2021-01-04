const { Router } = require('express')
const Estate = require('../models/Estate')

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

router.get('/get/all', async (req, res) => {
  const { sort } = req.query
  let sortParam
  if (sort === 'asc') {
    sortParam = { sort: { price: 1 } }
  } else if (sort === 'desc') {
    sortParam = { sort: { price: -1 } }
  } else {
    sortParam = null
  }

  await Estate.find({}, null, sortParam, (err, estates) => {
    if (err) {
      res.send(responseFormat(null, err))
    } else {
      res.send(responseFormat(estates))
    }
  })
})

router.get('/get/all/:email', async (req, res) => {
  const { email } = req.params

  await Estate.find({ owner: email }, (err, estates) => {
    if (err) {
      res.send(responseFormat(null, err))
    } else {
      res.send(responseFormat(estates))
    }
  })
})

router.get('/get/:id', async (req, res) => {
  const { id } = req.params

  await Estate.findById(id, (err, estate) => {
    if (err) {
      res.send(responseFormat(null, err))
    } else if (!estate) {
      res.send(responseFormat(null, { message: 'There isn\'t any estate that matches your query.' }))
    } else {
      res.send(responseFormat(estate))
    }
  })
})

router.post('/add', async (req, res) => {
  const { title, type, address, rooms, price, area, owner } = req.body
  const newEstate = new Estate({ title, type, address, rooms, price, area, owner })

  await newEstate.save((err, estate) => {
    if (err) {
      res.send(responseFormat(null, err))
    } else {
      res.send(responseFormat(estate))
    }
  })
})

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params

  await Estate.findByIdAndDelete(id, (err, estate) => {
    if (err) {
      res.send(responseFormat(null, err))
    } else {
      res.send(responseFormat(estate))
    }
  })
})

router.put('/update/:id', async (req, res) => { // maybe need to use post
  const { id } = req.params
  const updatedData = req.body

  await Estate.findByIdAndUpdate(id, updatedData, (err, estate) => {
    if (err) {
      res.send(responseFormat(null, err))
    } else {
      res.send(responseFormat(estate))
    }
  })
})

module.exports = router