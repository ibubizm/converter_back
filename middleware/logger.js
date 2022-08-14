const db = require('../db.config')

const logger = (req, res, next) => {
  const path = req.path
  db.query(`INSERT INTO logs (type) VALUES ('${path}')`, (err, result) => {
    if (err) {
      throw err
    }
    console.log()
  })
  next()
}

module.exports = logger
