const mongoose = require('mongoose')
require('dotenv').config()


const mongouri = process.env.MONGODB

const initialDatabase = async () =>{
    await mongoose.connect(mongouri).then(() => {
        console.log("Db COnnection made")
    }).catch((error) => console.log(error))
}

module.exports = {initialDatabase}