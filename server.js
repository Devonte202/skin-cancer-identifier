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

app.get("/api/experiment-results", (req, res) => {
  const results = [
    {
      image: 'data:' + 'image/jpeg' + ';' + 'base64' + ',' + fs.readFileSync('./poc-dataset/Benign/1.jpeg').toString('base64'),
      Benign: 100,
      Malignant: 0,
      actual: 'Benign',
      correct: true
    },
    {
      image: 'data:' + 'image/jpeg' + ';' + 'base64' + ',' + fs.readFileSync('./poc-dataset/Benign/2.jpeg').toString('base64'),
      Benign: 0,
      Malignant: 100,
      actual: 'Benign',
      correct: false
    },
    {
      image: 'data:' + 'image/jpeg' + ';' + 'base64' + ',' + fs.readFileSync('./poc-dataset/Benign/3.jpeg').toString('base64'),
      Benign: 0,
      Malignant: 100,
      actual: 'Benign',
      correct: false
    },
    {
      image: 'data:' + 'image/jpeg' + ';' + 'base64' + ',' + fs.readFileSync('./poc-dataset/Benign/4.jpeg').toString('base64'),
      Benign: 0,
      Malignant: 100,
      actual: 'Benign',
      correct: false
    },
    {
      image: 'data:' + 'image/jpeg' + ';' + 'base64' + ',' + fs.readFileSync('./poc-dataset/Benign/5.jpeg').toString('base64'),
      Benign: 0,
      Malignant: 100,
      actual: 'Benign',
      correct: false
    },
    {
      image: 'data:' + 'image/png' + ';' + 'base64' + ',' + fs.readFileSync('./poc-dataset/Malignant/1.png').toString('base64'),
      Benign: 0,
      Malignant: 100,
      actual: 'Malignant',
      correct: true
    },
    {
      image: 'data:' + 'image/png' + ';' + 'base64' + ',' + fs.readFileSync('./poc-dataset/Malignant/2.png').toString('base64'),
      Benign: 0,
      Malignant: 100,
      actual: 'Malignant',
      correct: true
    },
    {
      image: 'data:' + 'image/png' + ';' + 'base64' + ',' + fs.readFileSync('./poc-dataset/Malignant/3.png').toString('base64'),
      Benign: 0,
      Malignant: 100,
      actual: 'Malignant',
      correct: true
    },
    {
      image: 'data:' + 'image/png' + ';' + 'base64' + ',' + fs.readFileSync('./poc-dataset/Malignant/4.png').toString('base64'),
      Benign: 96,
      Malignant: 4,
      actual: 'Malignant',
      correct: false
    },
    {
      image: 'data:' + 'image/png' + ';' + 'base64' + ',' + fs.readFileSync('./poc-dataset/Malignant/5.png').toString('base64'),
      Benign: 0,
      Malignant: 100,
      actual: 'Malignant',
      correct: true
    }
  ]
  res.status(200).json(results)
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client-side/build/index.html"))
})



// Server is active on specified port
app.listen(port, () => console.log(`App listening on port ${port}`))