// run: 'node ./server'
// Specify port on .env

// get environmental variables
require('dotenv').config()

const express = require('express')
const ip = require('ip')
const path = require('path')

// use env-variable to decide listening port
const PORT = process.env.PORT || 8080

// get my ip
const IP = ip.address()

// start node express
const app = express()

// return index for all the other routes which are not find so
// that they will lead to mainpage
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on ip ${IP} port ${PORT}`)
})
