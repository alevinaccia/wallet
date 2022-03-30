const express = require('express')
const Account = require('./schemas/account')
const ConnectionHandler = require('./connections')

const router = express.Router()

//TODO fix this spaghetti too
router.get('/', async (req, res) => {
    res.send(await  updateAccounts());
})

router.post('/', async (req, res) => {
    let connectionHandler;
    try {
        const account = new Account({
            name: req.body.name,
            value: req.body.value,
            stats: req.body.stats,
            type: req.body.type,
            connection : req.body.connection
        })
        
        if(account.connection.name != 'none'){
            connectionHandler = new ConnectionHandler(account.connection.apiKey, account.connection.apiSecret)
            account.value = await connectionHandler.getBalance()
        }
        await account.save()
        res.send(account)
    } catch (error) {
        res.send({ 'mess': 'error' })
        res.statusCode = 404
    }
})

const updateAccounts = async () => {
    const accounts = await Account.find()
    accounts.forEach(async (account) => {
        if(account.connection.name != 'none'){
            let connectionHandler = new ConnectionHandler(account.connection.apiKey, account.connection.apiSecret)
            await Account.findByIdAndUpdate(account._id, {'value' : await connectionHandler.getBalance()})
        }
    })
    return accounts
}

module.exports = router
