const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require("morgan");
// const low = require("lowdb");
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const bookRouter = require("./routes/book")

// import express from 'express'
// import bodyParser from 'body-parser'
// import cors from 'cors'
// import morgan from "morgan"
// import low from "lowdb"
// import swaggerJSDoc from 'swagger-jsdoc'
// import swaggerUI from 'swagger-ui-express'
// import {bookRouter} from "./routes/book.js"

// const FileSync = require("lowdb/adapters/FileSync");

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors({ origin: true }));


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "ETH-HOUSE",
            version: "1.0.0",
            description: " Learning swagger"
        },
        servers: [
            {
                url: "http://localhost:3000"
            },
        ],
    },
    apis: ["./routes/*.js"]
}

const specs = swaggerJSDoc(options)


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))


app.use("/books", bookRouter)

app.get("/", function (req, res) {
    res.send("I am alive")
})

app.listen(3000, function (req, res) {
    console.log("started")
    // res.send("app is up and runnig")
})