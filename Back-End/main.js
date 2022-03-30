const express = require('express');
const cors = require('cors');
const  mongooose = require('mongoose')
const { json } = require('express');
const transactions = require('./transactionRouter')
const accounts = require('./accountRouter')
const connections = require('./connections')

require('dotenv').config()
mongooose.connect(process.env.mongo_uri);

const main = express()
const port = 3000;

main.use(cors());
main.use(json());

main.use('/transactions', transactions)
main.use('/accounts', accounts)
main.use('/connection', connections)

main.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})