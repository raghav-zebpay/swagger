const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const homeRouter = require("./routes/home")

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Testing",
            version: "1.0.0",
            description: " Learning swagger"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ],
    },
    apis: ["./routes/*.js"]
}

const specs = swaggerJSDoc(options)

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

app.use(cors({ origin: true }));

app.use("/home", homeRouter)

app.get("/", function (req, res) {
    res.send("I am alive")
})

app.listen(3000, function (req, res) {
    console.log("started")
    // res.send("app is up and runnig")
})