const connectToMongo = require("./db");
connectToMongo();
var cors=require('cors')

const express = require('express')
const app = express()
const port = 5000;

app.use(cors())
app.use(express.json()) //its a middleware,to access req.body in auth.js

//available routes
app.use('/api/auth',require('./routes/auth'))//it is from  auth.js file from router folder
app.use('/api/notes',require('./routes/notes'))


// app.get('/', (req, res) => {  
//   console.log(req.body)
//   res.send('Hello World!')
// })

// app.get('/v1/signup', (req, res) => {
//     res.send('Hello signup!')
//   })
//   app.get('/v1/login', (req, res) => {
//     res.send('Hello login')
//   })

app.listen(port, () => {
  console.log(`
    notebook backend listening on port ${port}`)
})