const express = require('express');
const Transaction = require('./schemas/transaction');
const Account = require('./schemas/account');


const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const transaction = new Transaction({
            msg: req.body.msg,
            value: req.body.value,
            type: req.body.type,
            account: req.body.account,
            date : req.body.date,
            category : req.body.category
        })
        await transaction.save();
        await updateAccount(transaction, 'add');
        res.send(transaction);
    } catch (error) {
        res.send({ 'mess': 'error' }); //TODO Send better error message
        res.statusCode = 404;
    }
})

router.get('/', async (req, res) => {
    res.send(await Transaction.find().catch(err => console.log("TRA", err)));
})

router.delete('/', async (req, res) => {
    const transactionToDelete = await Transaction.findByIdAndDelete(req.headers._id);
    await updateAccount(transactionToDelete, 'delete').then(() => {
        res.send(transactionToDelete._id);    
    });
})

router.put('/msg', async (req, res) => {
    res.send(await Transaction.findByIdAndUpdate(req.body._id, { msg : req.body.newMsg }, {new : true}));
 })

router.put('/category', async (req, res) => {
    res.send(await Transaction.findByIdAndUpdate(req.body._id, { category : req.body.newCat }, {new : true}));
})

router.put('/value', async (req, res) => {
    res.send(await Transaction.findByIdAndUpdate(req.body._id, { value : req.body.newValue }, {new : true}));
})

const updateAccount = async (transaction, operation) => {
    if (operation == 'add') {
        let currentAccount = await Account.findOne({ name: transaction.account });
        await Account.findOneAndUpdate({ name: transaction.account }, { value: currentAccount.value + transaction.value });
    } else if (operation == 'delete') {
        let currentAccount = await Account.findOne({ name: transaction.account });
        await Account.findOneAndUpdate({ name: transaction.account }, { value: currentAccount.value - transaction.value });
    }
}

module.exports = router