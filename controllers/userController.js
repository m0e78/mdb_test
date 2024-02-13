const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const userModel = require("../model/userModel")
const jwt = require("jsonwebtoken")

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body
  if (!userName || !email || !password) {
    res.status(400)
    throw new Error("All fields are mandatory")
  }
  const userAvailable = await userModel.findOne({ email })
  if (userAvailable) {
    res.status(400)
    throw new Error("User already registered")
  }
  //hash password
  const hashpassword = await bcrypt.hash(password, 10)
  console.log("hashed password: ", hashpassword)
  const user = await userModel.create({
    userName,
    email,
    password: hashpassword,
  })
  console.log(`user created ${user}`)
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email })
  } else {
    res.status(400)
    throw new Error("user data is not valid")
  }
})

  const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(400)
      throw new Error("All fields are mandatory")
    }
    const user = await userModel.findOne({ email })
    //comparing password with hashedd password
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        { user: { 
            userName: user.userName,
             email: user.email,
            id:user.id
            } },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"}
      )
      res.status(200).json({accessToken})
    }
    else{
        res.status(401)
        throw new Error ('Email or password is incorrect')
    }
  })

  const currentUser=asyncHandler(async(req,res)=>{

    res.json(req.user)
    console.log(req.user);
  })
module.exports = { registerUser,login,currentUser }
