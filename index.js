const bodyParser = require("body-parser")
const express = require("express")
const app = express()
    // const bodyParser = require("body-parser")
const router = require("./routers/blog")
const mongoose = require("mongoose")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://urajrishu:aUHDB96UyJaq9SB@cluster0.1wief.mongodb.net/tpramit", { useNewUrlParser: true })
    .then(() => console.log("let's go, MongoDb is connected"))
    .catch(err => console.log(err))


app.use('/', router)
const port = 3333;
app.listen(port, function() {
    console.log(`server is running on ${port}`)
})