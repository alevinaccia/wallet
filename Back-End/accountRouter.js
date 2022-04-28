const express = require('express')
const Account = require('./schemas/account')
const ConnectionHandler = require('./connections')

const router = express.Router()
const updatesDelay = 1.8*10^6; //30 minutes in milliseconds

//TODO fix this spaghetti too
router.get('/', async (req, res) => {
    res.send(await updateAccounts());
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
            connectionHandler = new ConnectionHandler(account.connection.apiKey, account.connection.apiSecret);
            account.value = await connectionHandler.getBalance().then(() => account.connection.lastUpdate == new Date.now());
        }
        await account.save()
        res.send(account)
    } catch (error) {
        res.send({ 'mess': 'error' })
        res.statusCode = 404
    }
})

const updateAccounts = async () => {
    const accounts = await Account.find();
    accounts.forEach(async (account) => {
        if(account.connection.name != 'none'){
            if(new Date().valueOf() - account.connection.lastUpdate > updatesDelay) {
                let connectionHandler = new ConnectionHandler(account.connection.apiKey, account.connection.apiSecret);
                await Account.findByIdAndUpdate(account._id, {'value' : await connectionHandler.getBalance(), 'connection' : {'lastUpadate' : new Date().valueOf()}});
            }
        }
    })
    return accounts;
}

module.exports = router;
