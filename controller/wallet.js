const wallet = require('../services/wallet')
const responseHandler =  require('../middleware/responseHandler')

module.exports = {
    registerAdmin : async (req, res)=> {
        console.log("Inside Register Admin Controller")
        try {
            let register = await wallet.registerAdmin()
            return responseHandler.sendResponse(res,200,register)
        } catch (error) {
            console.log("error", error)
            throw error
        }
    },
    registerUser : async (req,res)=> {
        console.log("Inside Register User Controller")
        try {
            let username = req.body.username

            let register = await wallet.registerUser(username)
            return responseHandler.sendResponse(res,200,register)
        } catch (error) {
            console.log("error", error)
            throw error
        }
    },
    createWallet : async (req,res)=> {
        console.log("Inside Create Wallet Controller")
        try {
            let username = req.body.username

            let arguments = [req.body.UniqueId,req.body.MobileNumber, req.body.CreatedFrom,req.body.WalletType,req.body.WalletBalance,req.body.Hours]
            
            let createWallet = await wallet.invokeChaincode(username, 'mychannel', 'walletcc', 'CreateWallet', arguments)
            let msg = "Wallet of: "+username+" is created with id: "+req.body.UniqueId+createWallet
            return responseHandler.sendResponse(res,200,msg)
        } catch (error) {
            console.log("error", error)
            throw error
        }
    },
    updateWalletDetails : async (req,res)=> {
        console.log("Inside Update Wallet details Controller")
        try {
            let username = req.body.username

            let arguments = [req.body.UniqueId, req.body.fieldName, req.body.Value]

            let updateWallet = await wallet.invokeChaincode(username, 'mychannel', 'walletcc', 'UpdateWalletDetails', arguments)
            let msg = "Wallet of: "+username+" with id: "+req.body.UniqueId +" is updated with "+ req.body.fieldName +" = "+req.body.Value+updateWallet

            return responseHandler.sendResponse(res,200,msg)
        } catch (error) {
            console.log("error", error)
            throw error
        }
    },
    showWalletDetails : async (req,res)=> {
        console.log("Inside Show Wallet Details Controller")
        try {
            let username = req.body.username
            let UniqueId = req.body.UniqueId

            let showWallet = await wallet.queryChaincode(username, 'mychannel', 'walletcc', 'QueryWalletData', UniqueId)
            return responseHandler.sendResponse(res,200,showWallet)
        } catch (error) {
            console.log("error", error)
            throw error
        }
    },
    addFunds : async (req,res)=> {
        console.log("Inside Add Funds Controller")
        try {
            let username = req.body.username
            let arguments = [req.body.UniqueId, req.body.Amount]
            let addFunds = await wallet.invokeChaincode(username, 'mychannel', 'walletcc', 'AddFunds', arguments)
            let msg = "Amount of "+req.body.Amount +" has been credited to Wallet linked with: "+username+" having wallet id: "+  req.body.UniqueId + addFunds

            return responseHandler.sendResponse(res,200,msg)
        } catch (error) {
            console.log("error", error)
            throw error
        }
    },
    withdrawFunds : async(req,res)=> {
        console.log("Inside Withdraw Funds Controller")
        try {
            let username = req.body.username
            let arguments = [req.body.UniqueId, req.body.Amount]

            let withdrawFunds = await wallet.invokeChaincode(username, 'mychannel', 'walletcc', 'WithdrawFunds', arguments)
            let msg = "Amount of "+req.body.Amount +" has been debited from Wallet linked with: "+username+" having wallet id: "+  req.body.UniqueId + withdrawFunds

            return responseHandler.sendResponse(res,200,msg)
        } catch (error) {
            console.log("error", error)
            throw error
        }
    },
    transferFunds : async (req,res)=> {
        console.log("Inside Transfer Funds Controller")
        try {
            let username =  req.body.username
            let arguments = [req.body.fromId, req.body.toId,req.body.Amount]

            let transferFunds = await wallet.invokeChaincode(username, 'mychannel', 'walletcc', 'TransferFunds', arguments)
            let msg = "Amount of "+ req.body.Amount +" has been to transfered from: "+ req.body.fromId+ " to "+req.body.toId+transferFunds
            return responseHandler.sendResponse(res,200,msg)
        } catch (error) {
            console.log("error", error)
            throw error
        }
    },
    deleteWallet : async (req,res)=> {
        console.log("Inside Delete Wallet Controller")
        try {
            let username = req.body.username
            let UniqueId = [req.body.UniqueId]

            let deleteWallet = await wallet.invokeChaincode(username, 'mychannel', 'walletcc', 'DeleteWallet', UniqueId)
            let msg = "Wallet having id: "+ UniqueId+" has been deleted "+deleteWallet
            return responseHandler.sendResponse(res,200,msg)
        } catch (error) {
            console.log("error", error)
            throw error
        }
    }
}