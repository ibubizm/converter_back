const db = require('../db.config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class AuthController {
  async registration(req, res) {
    const { email, password, userName } = req.body
    try {
      db.query(
        `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(email)});`,
        (err, result) => {
          if (result.length) {
            return res.status(409).json({
              msg: 'This user is already in use!',
            })
          } else {
            // username is available
            bcrypt.hash(password, 6, (err, hash) => {
              if (err) {
                return res.status(500).json({
                  msg: err,
                })
              } else {
                // has hashed pw => add to database
                db.query(
                  `INSERT INTO users (username, email, password) VALUES ('${userName}', ${db.escape(
                    email
                  )}, ${db.escape(hash)})`,
                  (err, result) => {
                    if (err) {
                      //   throw err;
                      return res.status(400).json({
                        msg: err,
                      })
                    }
                    return res.status(201).json({
                      msg: 'The user has been registerd with us!',
                    })
                  }
                )
              }
            })
          }
        }
      )
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'registration error' })
    }
  }

  async login(req, res) {
    const { email, password } = req.body
    try {
      db.query(
        `SELECT * FROM users WHERE email = ${db.escape(email)};`,
        (err, result) => {
          // user does not exists
          if (err) {
            return res.status(400).json({
              msg: err,
            })
          }
          if (!result.length) {
            return res.status(401).json({
              msg: 'Email or password is incorrect!',
            })
          }
          // check password

          bcrypt.compare(password, result[0]['password'], (bErr, bResult) => {
            // wrong password
            if (bErr) {
              return res.status(401).json({
                msg: 'Email or password is incorrect!',
              })
            }
            if (bResult) {
              const token = jwt.sign(
                { id: result[0].id },
                'the-super-strong-secrect',
                { expiresIn: '1h' }
              )
              return res.status(200).json({
                msg: 'Logged in!',
                token,
                user: result[0],
              })
            }
            return res.status(401).json({
              msg: 'Username or password is incorrect!',
            })
          })
        }
      )
    } catch (e) {
      console.log(e)
    }
  }

  async auth(req, res) {
    try {
      const { id } = req.user
      db.query(`SELECT * FROM users WHERE id = ${id};`, (err, result) => {
        // console.log(result)
        const token = jwt.sign(
          { id: result[0].id },
          'the-super-strong-secrect',
          { expiresIn: '1h' }
        )
        return res.status(200).json({
          msg: 'Logged in!',
          token,
          user: result[0],
        })
      })
    } catch (e) {
      console.log(e)
    }
  }

  async users(req, res) {
    try {
      return res.json('users')
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new AuthController()
