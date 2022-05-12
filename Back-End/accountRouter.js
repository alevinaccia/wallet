const express = require('express')
const Account = require('./schemas/account')
const ConnectionHandler = require('./connections')

const router = express.Router()
const updatesDelay = 1.8 * Math.pow(10,6); //30 minutes in milliseconds


//TODO fix this spaghetti too
router.get('/', async (req, res) => {
    res.send(await updateAccounts().catch(err => console.log("ACC", err)));
})

router.post('/', async (req, res) => {
    let connectionHandler;
    try {
        const account = new Account({
            name: req.body.name,
            value: req.body.value,
            stats: req.body.stats,
            type: req.body.type,
            connection: req.body.connection
        })

        if (account.connection.name != 'none') {
            connectionHandler = new ConnectionHandler(account.connection.apiKey, account.connection.apiSecret);
            account.value = await connectionHandler.getBalance().then(() => account.connection.lastUpdate == new Date.now());
        }
        await account.save();
        res.send(account);
    } catch (error) {
        res.send({ 'mess': 'error' })
        res.statusCode = 404
    }
})

router.put('/name', async (req, res) => {
   res.send(await Account.findByIdAndUpdate(req.body._id, { name : req.body.newName }, {new : true}));
})

router.put('/value', async (req, res) => {
    res.send(await Account.findByIdAndUpdate(req.body._id, { value : req.body.newValue }, {new : true}));
 })

const updateAccounts = async () => {
    const accounts = await Account.find();
    accounts.forEach(async (account) => {
        if (account.connection.name != 'none') {
            if (new Date().valueOf() - account.connection.lastUpdate > updatesDelay) {
                let connectionHandler = new ConnectionHandler(account.connection.apiKey, account.connection.apiSecret);
                await Account.findByIdAndUpdate(account._id, { $set : { 
                    'connection.lastUpdate' : new Date().valueOf(),
                    'connection.name' : "Binance",
                    value : await connectionHandler.getBalance()
                }})
            }
        }
    })
    return accounts;
}

module.exports = router;
