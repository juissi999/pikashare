const router = require('express').Router()
const handlers = require('./handlers')

// SAFE = action does not change the servers state or database
// IDEMPONENT = effect is the same if you do the action once or n times

router.get('/all', handlers.getAllShares)

router.post('/', handlers.post)

// SAFE, IDEMPONENT
router.get('/:shareid', handlers.getFiles)

router.delete('/:shareid/:filename', handlers.delete)

module.exports = router
