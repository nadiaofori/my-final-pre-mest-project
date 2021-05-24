const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const connectDb = require('./db');
// reguire('dotenv/config')

const app = express();
const port = 5000
app.use(express.json())
app.use(cors())

connectDb()

app.use('/api/v1', routes)

// app.get("/",(req,res) =>{
//      res.status(200).send("Hello World")
// })

app.listen(port,() => console.log(`'server is running at port ${port}......'`))