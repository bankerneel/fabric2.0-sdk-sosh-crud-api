const wallet = require('../services/wallet')
const responseHandler =  require('../middleware/responseHandler')

module.exports = {
    registerAdmin : async (req, res)=> {
        console.log("Inside Register Admin Controller")
        try {
            let register = await wallet.registerAdmin()
            return register
        } catch (error) {
            console.log("error", error)
            throw error
        }
    },
    registerUser : async (req,res)=> {
        console.log("Inside Register User Controller")
        try {
            let username = req.body.name

            let register = await wallet.registerUser(username)
            
            return register
        } catch (error) {
            console.log("error", error)
            throw error
        }
    },
    createWallet : async (req,res)=> {
        console.log("Inside Create Wallet Controller")
        try {
            let username = req.body.name

            var arguments = [req.body.UniqueId,req.body.MobileNumber, req.body.CreatedFrom,req.body.WalletType,req.body.WalletBalance,req.body.Hours]
            
            let createWallet = await wallet.invokeChaincode(username, 'mychannel', 'walletcc', 'CreateWallet', arguments)

            return createWallet
        } catch (error) {
            console.log("error", error)
            throw error
        }
    },
    updateWalletDetails : async (req,res)=> {
        console.log("Inside Update Wallet details Controller")
        try {
            let username = req.body.name

            var arguments = [req.body.UniqueId, req.body.fieldName, req.body.Value]

            let updateWallet = await wallet.invokeChaincode(username, 'mychannel', 'walletcc', 'UpdateWalletDetails', arguments)

            return updateWallet
        } catch (error) {
            console.log("error", error)
            throw error
        }
    },
    showWalletDetails : async (req,res)=> {
        console.log("Inside Show Wallet Details Controller")
        try {
            let username = req.body.name
            let UniqueId = req.body.id

            let showWallet = await wallet.queryChaincode(username, 'mychannel', 'walletcc', 'QueryWalletData', UniqueId)
            return showWallet
        } catch (error) {
            console.log("error", error)
            throw error
        }
    },
    addFunds : async (req,res)=> {
        console.log("Inside Add Funds Controller")
        try {
            let username = req.body.name
            var arguments = [req.body.UniqueId, req.body.Amount]
            let addFunds = await wallet.invokeChaincode(username, 'mychannel', 'walletcc', 'AddFunds', arguments)
            return addFunds
        } catch (error) {
            console.log("error", error)
            throw error
        }
    },
    withdrawFunds : async(req,res)=> {
        console.log("Inside Withdraw Funds Controller")
        try {
            let username = req.body.name
            var arguments = [req.body.UniqueId, req.body.Amount]

            let addFunds = await wallet.invokeChaincode(username, 'mychannel', 'walletcc', 'WithdrawFunds', arguments)

            return addFunds
        } catch (error) {
            console.log("error", error)
            throw error
        }
    },
    transferFunds : async (req,res)=> {
        console.log("Inside Transfer Funds Controller")
        try {
            let username =  req.body.name
            var arguments = [req.body.fromId, req.body.toTd,req.body.Amount]

            let transferFunds = await wallet.invokeChaincode(username, 'mychannel', 'walletcc', 'TransferFunds', arguments)

            return transferFunds
        } catch (error) {
            console.log("error", error)
            throw error
        }
    },
    deleteWallet : async (req,res)=> {
        console.log("Inside Delete Wallet Controller")
        try {
            let username = req.body.name
            var UniqueId = req.body.UniqueId

            let deleteWallet = await wallet.invokeChaincode(username, 'mychannel', 'walletcc', 'DeleteWallet', UniqueId)

            return deleteWallet
        } catch (error) {
            console.log("error", error)
            
        }
    }
}