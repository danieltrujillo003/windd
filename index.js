const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const estatesRoutes = require('./routes/estates')
const usersRoutes = require('./routes/users')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
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

app.get('/', (req, res) => res.send({ message: 'This is the Windd API. Go to /users/login to log in.'}))
app.use('/estates', estatesRoutes)
app.use('/users', usersRoutes)

const connOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
}

mongoose.connect(
  "mongodb://localhost:27017/windd", connOptions, (err) => {
    if (err) return console.log('error connecting to the db: \n', err)
    console.log("Database connected")
    app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
  }
)
