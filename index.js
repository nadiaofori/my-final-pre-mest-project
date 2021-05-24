const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const connectDb = require('./db');

const app = express();
const port = 5000
app.use(express.json())
app.use(cors())

connectDb()

app.use('/api/v1', routes)

// app.get("/",(req,res) =>{
//      res.status(200).send("Hello World")
// })

app.listen(process.env.PORT || 5000,() => console.log(`'server is running at port ${port}......'`));