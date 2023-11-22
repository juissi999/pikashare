const multer = require('multer')
const path = require('path')
const fs = require('fs')

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
    const shareId = req.headers['_shareId']
    const uploadpath = path.resolve(UPLOADPATH, shareId)
    if (!fs.existsSync(uploadpath)) {
      fs.mkdirSync(uploadpath, { recursive: true })
    }
    cb(null, uploadpath)
  },
  filename: (req, file, cb) => {
    filename_urlified = file.originalname.replace(/ /g, '_')
    cb(null, filename_urlified)
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
  const shareId = uuidv4()

  const opts = {
    storage: storage,
    limits: {
      fileSize: MAXSIZE
    }
  }

  request.headers['_shareId'] = shareId

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
