const multer = require('multer')
const path = require('path')

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const { v4: uuidv4 } = require('uuid')

const MAXSIZE = 50000000
const UPLOADPATH = 'data/uploads/'
const DBPATH = 'data/db.json'

// Read or create db.json
const adapter = new FileSync(DBPATH)
const db = low(adapter)
db.defaults({ shares: [] }).write()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadpath = path.resolve(UPLOADPATH)
    cb(null, uploadpath)
  },
  filename: (req, file, cb) => {
    const timestamp = Math.round(new Date().getTime() / 1000)
    filename_urlified = file.originalname.replace(/ /g, '_')
    cb(null, timestamp.toString() + '_' + filename_urlified)
  }
})

exports.getFiles = (request, response) => {
  element = db.get('shares').find({ id: request.params.shareid }).value()

  if (element) {
    response.json(element)
    response.status(200).end()
  } else {
    response.status(404).end()
  }
}

exports.getAllShares = (request, response) => {
  shares = db.get('shares')
  response.json(shares)
}

exports.post = (request, response) => {
  const opts = {
    storage: storage,
    limits: {
      fileSize: MAXSIZE
    }
  }

  const upload = multer(opts).any('files')

  upload(request, response, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return response.status(400).send({ error: 'File too big.' })
      }
      return response.status(400).end()
    }

    // add to database linker information
    const filenames = request.files.map((file) => file.filename)
    const shareId = uuidv4()

    db.get('shares').push({ id: shareId, files: filenames }).write()

    response.json({
      shareId
    })
    response.status(200).end()
  })
}

exports.delete = (request, response) => {
  const id = Number(request.params.shareid)
  const filename = request.params.filename

  // File.deleteOne({ shareid: id, filename: filename })
  //   .then(() => {
  //     // file deleted, all ok
  //     response.status(204).end()
  //   })
  //   .catch((err) => {
  //     response.status(409).end()
  //     return console.log(err)
  //   })
}
