const walletController = require('../../controller/wallet')
const express = require('express')
const router = express.Router()

router.post('/registerAdmin',walletController.registerAdmin)
router.post('/registerUser',walletController.registerUser)
router.post('/createWallet',walletController.createWallet)
router.post('/updateWalletDetails',walletController.updateWalletDetails)
router.post('/showWalletDetails',walletController.showWalletDetails)
router.post('/addFunds',walletController.addFunds)
router.post('/withdrawFunds',walletController.withdrawFunds)
router.post('/transferFunds',walletController.transferFunds)
router.post('/deleteWallet',walletController.deleteWallet)

module.exports = router