const express = require("express")
const router = express.Router()
const { registerUser,login,currentUser } = require("../controllers/userController")
const validateToken=require('../middleware/validateTokenHandler')
router.route('/register').post(registerUser)
router.route('/login').post(login)
router.route('/current').get(validateToken,currentUser)

module.exports=router


