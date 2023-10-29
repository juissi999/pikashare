const multer = require('multer')
const path = require('path')
const fs = require('fs')

// use webpack config file to get build directory
//const wpconf = require('../../webpack.config')
const builddir = '..' //wpconf.output.path

const MAXSIZE = 5000000
const UPLOADDIR = 'uploads/'

files = ['test']

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // check if upload directory exists and if not, create it
    const uploadpath = path.resolve(builddir, UPLOADDIR)
    if (!fs.existsSync(uploadpath)) {
      fs.mkdirSync(uploadpath, { recursive: true })
    }

    cb(null, uploadpath)
  },
  filename: (req, file, cb) => {
    const timestamp = Math.round(new Date().getTime() / 1000)
    cb(null, timestamp.toString() + '_' + file.originalname)
  }
})

exports.getFiles = (request, response) => {
  response.json(files)
  // File.find({ noteid: request.params.noteid })
  //   .then((files) => {
  //     response.json(files)
  //   })
  //   .catch((err) => {
  //     console.log(err.message)
  //     response.status(400).end()
  //   })
}

exports.post = (request, response) => {
  const opts = {
    storage: storage,
    limits: {
      fileSize: MAXSIZE
    }
  }

  const upload = multer(opts).single('memFile')

  upload(request, response, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return response.status(400).send({ error: 'File too big.' })
      }
      return response.status(400).end()
    }

    // add to database linker information
    //const fname = request.file.filename
    //const noteid = request.body.noteid
    console.log('test')
    return

    //   const file = new File({
    //     noteid: noteid,
    //     filename: fname
    //   })

    //   file
    //     .save()
    //     .then(() => {
    //       response.json({
    //         filename: fname,
    //         noteid: noteid,
    //         uploaddir: UPLOADDIR
    //       })
    //       response.status(200).end()
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //       response.status(400).end()
    //     })
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