const mongoose = require('mongoose')

const transaction = new mongoose.Schema({
    msg : { type : String, required : true},
    value : { type : Number, required : true},
    type : { type : String, default : 'Cash'},
    account : { type: String, required : true},
    date : { type : String, require : true},
    category : { type: String, required : true}
})

module.exports = mongoose.model('transaction', transaction)