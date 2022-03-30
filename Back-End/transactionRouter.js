const express = require('express')
const Transaction = require('./schemas/transaction')

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const transaction = new Transaction({
            msg: req.body.msg,
            value: req.body.value,
            type: req.body.type,
            account : req.body.account
        })
        await transaction.save();
        res.send(transaction);
    } catch (error) {
        console.log(error);
        res.send({ 'mess': 'error' }); //TODO Send better error message
        res.statusCode = 404;
    }
})

router.get('/', async (req,res) => {
    res.send(await Transaction.find());
})

router.delete('/', async(req,res) => {
    try {
        res.send(await Transaction.findOneAndDelete({ _id : req.headers._id})); 
    } catch (error) {
        res.send('Error')
        res.status(404);
    }
})

module.exports = router