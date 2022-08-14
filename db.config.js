const mysql = require('mysql')

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'convert',
  port: process.env.DB_PORT || 3306,
})

// connection.query('CREATE DATABASE IF NOT EXISTS convert', (err, results) => {
//   if (err) console.log(err)
//   else console.log('База данных создана')
// })

const querytable =
  'CREATE TABLE IF NOT EXISTS exchange_rate( id INT PRIMARY KEY AUTO_INCREMENT, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, rub FLOAT, eur FLOAT, jpy FLOAT, usd FLOAT DEFAULT 1)'

connection.query(querytable, (err, result) => {
  if (err) console.log(err)
  else console.log('Таблица создана')
})
// const connection = mysql.createPool(config)

module.exports = connection
