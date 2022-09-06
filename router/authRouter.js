const Router = require('express')
const router = new Router()
const AuthController = require('../controllers/authController')
const AuthMiddleware = require('../middleware/authMiddleware')
const {
  signupValidation,
  loginValidation,
} = require('../validation/validation')

router.get('/users', AuthController.users)
router.post('/login', loginValidation, AuthController.login)
router.get('/auth', AuthMiddleware, AuthController.auth)
router.post('/registration', signupValidation, AuthController.registration)

module.exports = router
