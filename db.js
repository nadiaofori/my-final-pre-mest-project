const mongoose = require ('mongoose')
require('dotenv/config')

const connectDb = async () =>{
    try{
       const connect = await mongoose.connect(process.env.DB_CONNECTION,
            {useNewUrlParser :true, useUnifiedTopology : true}
            )
            console.log('DB is connected ...');
    }catch (error) {

        console.log(error)
    }

}
module.exports = connectDb;