const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require("morgan");
const fs = require("fs");
const path = require('path');
const jsYaml = require("js-yaml");
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const bookRouter = require("./routes/book")
const apiSpec = path.join(__dirname, "./openApi.yaml")


let schema


function swagger() {
    try {
        schema = jsYaml.load(fs.readFileSync(apiSpec));
    } catch (error) {
        console.log("YAML load failed", error)
    }
}

swagger()

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



app.use(cors({ origin: true }));


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(schema))

app.use("/books", bookRouter)

app.get("/", function (req, res) {
    res.send("I am alive")
})

app.listen(3000, function (req, res) {
    // console.log("started")
    console.log("app is up and running")
})