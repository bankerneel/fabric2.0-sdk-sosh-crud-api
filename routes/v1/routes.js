const wallet = require('../../services/walletDetails')
const express = require('express')
const router = express.Router()

router.post('/wallet/registerAdmin',wallet.registerAdmin)
router.post('/wallet/registerUser',wallet.registerUser)
router.post('/wallet/invokeChaincode',wallet.invokeChaincode)
router.post('/wallet/queryChaincode',wallet.queryChaincode)

module.exports = router
