const express = require('express')
const cors = require('cors')
require('dotenv').config()
const schedule = require('node-schedule')
const ExchangeService = require('./services/exchangeService')
const logger = require('./middleware/logger')

const router = require('./router/router')

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(logger)
app.use('/api', router)

const start = async () => {
  try {
    schedule.scheduleJob('0 0 12 * * ?', async () => {
      await ExchangeService.addDataToDb()
      console.log('added')
    })
    app.listen(port, () => {
      console.log('working ' + port)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
