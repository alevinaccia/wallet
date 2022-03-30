const { Spot } = require('@binance/connector')

class ConnectionHandler{
    constructor(apiKey, apiSecret){
        this.client = new Spot(apiKey, apiSecret)
    }

    getBalance = async (days) => {
        //The idea is to be able to get data up to 7 days and not from just the day before
        const data = await this.client.accountSnapshot('SPOT').then(response => response.data.snapshotVos)
        const length = data.length
        const btcInEur = await this.convert('BTC', 'EUR')
        return (data[length - 1].data.totalAssetOfBtc * btcInEur).toFixed(2)
    }
    
    convert = async (token1, token2) => { 
        return await this.client.avgPrice(`${token1}${token2}`).then(response => response.data.price)
    }
}

module.exports = ConnectionHandler