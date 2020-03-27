const wallet = require('./routes/v1/wallet')
const express = require('express')
const router = express.Router()

router.use('/wallet',wallet)

module.exports = router