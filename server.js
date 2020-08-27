const express = require("express")
const app = express()
const csv = require('csv-parser')
const fs = require('fs')

// Extra dependencies required to parse bodies
const path = require("path")
const bodyParser = require("body-parser")

// port is specified in environment variable or default to 8080
const port = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Specifies path to React build to be served
app.use(express.static(path.join(__dirname, "client-side/build")))

app.get("/api/melanoma-death-data", (req, res) => {
  const results = []
  fs.createReadStream('./melanoma-deaths-annually.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.status(200).json({data: results})
    })
})

app.get("/api/melanoma-survival-data", (req, res) => {
  const results = []
  fs.createReadStream('./melanoma-survival-data.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.status(200).json({data: results})
    })
})

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client-side/build/index.html"))
})



// Server is active on specified port
app.listen(port, () => console.log(`App listening on port ${port}`))