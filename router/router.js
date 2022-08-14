const Router = require('express')
const router = new Router()
const ExchangeController = require('../controllers/courseController')
const convertLogger = require('../middleware/converLoggerMiddlewere')

router.get('/getAll', ExchangeController.getAllBy)
router.get('/getCurrentRate', ExchangeController.getCurrentRate)
router.get('/convert', ExchangeController.convert)

module.exports = router
