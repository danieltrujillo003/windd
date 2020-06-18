const { Router } = require('express');
const Estate = require('../models/Estate');

const router = Router();

// const responseFormat = (data, error = {}) => {
//   return {
//     res: {
//       success: !Object.keys(error).length,
//       data,
//       error: {
//         title: error.name,
//         message: error.message
//       }
//     }
//   }
// }

router.get('/getall', async (req, res) => {
  const estates = await Estate.find({});
  return res.status(200).json({estates});
});

router.get('/getsingle/:id', async (req, res) => {
  const { id } = req.params;
  const estate = await Estate.findById({_id: id});
  return res.status(200).json({estate});
});

router.post('/add', async (req, res) => {
  const { title, type, address, rooms, price, area } = req.body;
  const newEstate = new Estate({ title, type, address, rooms, price, area });
  await newEstate.save();
  return res.status(200).json({
      response: "Estate added successfully"
  });
});

router.delete('/delete/:id', (req, res) => {
  res.end()
});

router.put('/update/:id', (req, res) => {
  res.end()
});

module.exports = router;