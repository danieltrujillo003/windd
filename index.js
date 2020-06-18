const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const estatesRoutes = require('./routes/estates')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   next();
// });

app.get('/', (req, res) => res.send({ message: 'This is the Windd API. Go to *** to log in.'})) // TODO: Add login endpoint
app.use('/estates', estatesRoutes)

mongoose.connect(
  "mongodb://localhost:27017/windd",
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) throw err
    console.log("Database connected")
    app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
  }
)
