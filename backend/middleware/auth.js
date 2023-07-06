const jwt = require('jsonwebtoken')
const User = require('../Models/userModel')
require("dotenv").config()

const auth = async (req, res, next) => {
    try {

        const token = req.header('Authorization').replace('Bearer ', '')
        console.log(token)
        const tokenVerify = jwt.verify(token, 'SECRET_KEY')
        console.log(tokenVerify)

        const user = await User.findOne({ _id: tokenVerify._id.toString(), tokens: token })
        console.log(user)
        if (!user) {
            throw new Error('you must be user')
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).json({ error: 'please login' })
    }
}

module.exports=auth
