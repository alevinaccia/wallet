const mongoose = require('mongoose')

const account = new mongoose.Schema({
    name : { type : String, required : true},
    value : { type : Number, required : true},
    stats : { type : Boolean, default : false},
    type : { type : String, default : 'Cash'},
    connection : Object
})

module.exports = mongoose.model('account', account)