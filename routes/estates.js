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

router.get('/getall', async (req, res) => {
  await Estate.find({}, (err, estates) => {
    if (err) {
      res.send(responseFormat(null, err))
    } else if (estates.length === 0) {
      res.send(responseFormat(null, { name: 'There are no estates' }))
    } else {
      res.send(responseFormat(estates))
    }
  })
})

router.get('/getsingle/:id', async (req, res) => {
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
  const { title, type, address, rooms, price, area } = req.body
  const newEstate = new Estate({ title, type, address, rooms, price, area })
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

router.put('/update/:id', async (req, res) => {
  const { id } = req.params
  await Estate.findById(id, (err, estateToUpdate) => {
    if (err) {
      res.send(responseFormat(null, err))
    } else {
      const { title, type, address, rooms, price, area } = req.body

      if(title) estateToUpdate.title = title
      if(type) estateToUpdate.type = type
      if(address) estateToUpdate.address = address
      if(rooms) estateToUpdate.rooms = rooms
      if(price) estateToUpdate.price = price
      if(area) estateToUpdate.area = area

      estateToUpdate.save((err, estate) => {
        if (err) {
          res.send(responseFormat(null, err))
        } else {
          res.send(responseFormat(estate))
        }
      })
    }
  })
})

module.exports = router