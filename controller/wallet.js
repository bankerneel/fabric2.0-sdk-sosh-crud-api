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

            let arguments = [req.body.UniqueId, req.body.CreatedFrom,req.body.WalletType]
            
            let createWallet = await wallet.invokeChaincode(username, 'soshchannel', 'wallet', 'CreateWallet', arguments)
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

            let Fields = req.body.fieldNames
            let values = req.body.Values
            let i=0
            key="\[",
            value="\["
            let Fieldlength=Fields.length
            for(i=0;i<Fieldlength;i++){
                if(i==Fieldlength-1){
                    key+="\""+Fields[i]+"\"]"
                    value+=values[i]+"]"
                }else{
                    key+="\""+Fields[i]+"\","
                    value+=values[i]+","
                }
            }
            let arguments = [req.body.UniqueId,''+key+'',''+value+'']
            console.log("arguments", arguments)
            let updateWallet = await wallet.invokeChaincode(username, 'soshchannel', 'wallet', 'UpdateWalletDetails', arguments)
            let msg = "Wallet of: "+username+" with id: "+req.body.UniqueId +" is updated with "+ req.body.fieldNames +" = "+req.body.Values+updateWallet

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

            let showWallet = await wallet.queryChaincode(username, 'soshchannel', 'wallet', 'QueryWalletData', UniqueId)
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
            let addFunds = await wallet.invokeChaincode(username, 'soshchannel', 'wallet', 'AddFunds', arguments)
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

            let withdrawFunds = await wallet.invokeChaincode(username, 'soshchannel', 'wallet', 'WithdrawFunds', arguments)
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
            console.log("arguments", arguments)

            let transferFunds = await wallet.invokeChaincode(username, 'soshchannel', 'wallet', 'TransferFunds', arguments)
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

            let deleteWallet = await wallet.invokeChaincode(username, 'soshchannel', 'wallet', 'DeleteWallet', UniqueId)
            let msg = "Wallet having id: "+ UniqueId+" has been deleted "+deleteWallet
            return responseHandler.sendResponse(res,200,msg)
        } catch (error) {
            console.log("error", error)
            throw error
        }
    }
}