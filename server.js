// run: 'node ./server'
// Specify port on .env

const express = require('express')
const ip = require('ip')
const path = require('path')
const fs = require('fs')

const fileRouter = require('./files/routes')

// get environmental variables
require('dotenv').config()

// check filedir exists and create if not
UPLOADDIR = process.env.UPLOADDIR
console.log(UPLOADDIR)
const uploadpath = path.resolve(UPLOADDIR)
if (!fs.existsSync(uploadpath)) {
  fs.mkdirSync(uploadpath, { recursive: true })
}

// use env-variable to decide listening port
const PORT = process.env.PORT || 8080

// get my ip
const IP = ip.address()

// start node express
const app = express()

app.use('/files', fileRouter)

// return index for all the other routes which are not find so
// that they will lead to mainpage
app.get('/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, './', 'share.html'))
})

// return index for all the other routes which are not find so
// that they will lead to mainpage
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on ip ${IP} port ${PORT}`)
})
