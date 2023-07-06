const User = require('../Models/userModel')

const register = async function (req, res) {
    try {
        if (!req.body.name || !req.body.email || !req.body.password) {
            throw new Error('name, email and password are required')
        }

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        const token = await newUser.generateToken()
        await newUser.save()
        res.status(200).send([newUser, token])
    } catch (e) {
        return res.status(400).json(e.message)
    }
}

// Login
const login = async function (req, res) {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateToken()
        res.status(200).send([user, token])
    }
    catch (e) {
        res.status(400).json(e)
    }
}
module.exports = { register, login }
