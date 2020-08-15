const express = require("express")
const app = express()

// Extra dependencies required to parse bodies
const path = require("path")
const bodyParser = require("body-parser")

// port is specified in environment variable or default to 8080
const port = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Specifies path to React build to be served
app.use(express.static(path.join(__dirname, "client-side/build")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client-side/build/index.html"))
})

// Server is active on specified port
app.listen(port, () => console.log(`App listening on port ${port}`))