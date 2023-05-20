const userModel = require("../model/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
let emailRegx = "/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"

const createUser = async function(req, res) {
    try {
        const { name, email, password } = req.body
        let data = req.body

        function isEmail(email) {
            var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
            if (email !== '' && email.match(emailFormat)) { return true; }

            return false;
        }
        if (!isEmail(email)) {
            return res.status(400).send({ error: true, message: "enter a valid email", data: null })
        }
        if (name && email && password) {
            let findUser = await userModel.findOne({ email: email }).lean()
            if (findUser) {
                return res.status(400).send({ error: true, message: "email already registerd", data: null })
            }
            let encryptPassword = await bcrypt.hash(password, 10)
            data.password = encryptPassword;
            let user = await userModel.create(data)
            res.status(201).send({ error: false, message: "blog is created", data: user })
        } else {
            res.status(201).send({ error: true, message: "enter all details", data: null })
        }
    } catch (err) {
        res.status(500).send({ message: "server error", error: err })
    }
}
const login = async(req, res) => {
    try {
        let { email, password } = req.body
        if (!email && !password) {
            res.status(400).send({ error: true, message: "enter email and password" })
        }
        let user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).send({ error: true, message: "user not found" })
        } else {
            if (bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1d" })
                res.status(200).send({ error: false, message: "user login", data: { token } })
            } else {
                res.status(400).send({ error: true, message: "incorrect password" })
            }
        }
    } catch (err) {

    }
}

module.exports = { createUser, login }