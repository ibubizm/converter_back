const db = require('../db.config')
const ExchangeService = require('../services/exchangeService')

class ExchangeController {
  async getAllBy(req, res) {
    try {
      const { date, ticker } = req.body
      db.query(
        `SELECT ${ticker || '*'} FROM exchange_rate WHERE date '${date}'`,
        async (err, result) => {
          if (err) {
            return err
          }
          return res.json(result)
        }
      )
    } catch (e) {
      console.log(e)
    }
  }

  async getCurrentRate(req, res) {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let yyyy = today.getFullYear()

    today = dd + '.' + mm + '.' + yyyy
    db.query(
      'SELECT * FROM exchange_rate ORDER BY id DESC LIMIT 1',
      async (err, result) => {
        const currentTime = new Date(result[0].date).toLocaleDateString(
          'ru-RU',
          { timeZone: 'Europe/Moscow' }
        )
        if (currentTime != today) {
          await ExchangeService.addDataToDb()
        }
        return res.json(result)
      }
    )
  }

  async convert(req, res) {
    try {
      const { firstValue, secondValue, amount } = req.query
      db.query(
        'SELECT * FROM exchange_rate ORDER BY id DESC LIMIT 1',
        (err, result) => {
          let data = JSON.stringify(result[0])
          data = JSON.parse(data)
          let resultat
          if (data[firstValue] > data[secondValue]) {
            resultat = (data[secondValue] / data[firstValue]) * amount
          } else if (data[firstValue] < data[secondValue]) {
            resultat = (data[secondValue] / data[firstValue]) * amount
          }
          return res.json(resultat)
        }
      )
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new ExchangeController()
