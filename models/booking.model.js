const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    custName:String,
    email:String,
    phoneNum: Number,
    travelerNum: {
        type: Number,
        default: 1
    },
    specialReq: String

})

const Bookings = mongoose.model('Bookings',bookingSchema)

module.exports = Bookings