"use strict"

const express = require("express")
const app = express()

require("dotenv").config()
const PORT = process.env.PORT

const dbConnection = require("./configs/dbConnection")
dbConnection()


app.use(express.json())

app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to user',
       
    })
})

app.use(require("./middlewares/errorHandler"))

app.listen(PORT, ()=> console.log("http://127.0.0.1:" + PORT))