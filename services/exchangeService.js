const axios = require('axios')
const db = require('../db.config')

class ExchangeService {
  async addDataToDb() {
    try {
      const { data } = await axios.get(process.env.API_URL, {
        params: {
          apikey: process.env.API_KEY,
          symbols: 'EUR,USD,RUB,JPY',
        },
      })
      const { rates, date } = data
      db.query(
        `INSERT INTO exchange_rate ( rub, eur, jpy) VALUES ( '${rates.RUB}', '${rates.EUR}', '${rates.JPY}')`,
        (err, result) => {
          if (err) {
            throw err
          }
        }
      )
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new ExchangeService()
