const enrollAdmin = require('../sdk/enrollAdmin');
const registerUser = require('../sdk/registerUser');
const invokeChaincode = require('../sdk/invoke');
const queryWalletDetails = require('../sdk/query');


module.exports = {
    //Enroll Admin needs to be called only once
    registerAdmin: async (req,res)=>{
        console.log("Inside Enroll Admin Service");
        try {
            let enroll = await enrollAdmin.enrollAdmin(req,res)
            return enroll
          } catch (error) {
         console.log("error", error)
         throw error
        }
    },
    registerUser: async (req,res)=>{
        console.log("Inside Register User Service")        
        try {
            console.log("test",req.body)
            let username = req.body.name
            console.log("username", username)
            let reg = await registerUser.registerUser(username,req, res)
            return reg
        } catch (error) {
        console.log("error", error)
        throw error
        }
    },
    invokeChaincode: async (req,res)=>{
        console.log('Inside Invoke Chaincode Service')
        try {
            let username = req.body.name
            let channelName = req.body.channelName
            let contractName = req.body.contractName
            let functionName =  req.body.functionName

            if (functionName === 'CreateWallet'){
                console.log("functionName", functionName)
                //For create Wallet
                var arguments = [req.body.id,req.body.MobileNO, req.body.CreatedFrom,req.body.WalletType,req.body.WalletBalance,req.body.hours]
                let invoke = await invokeChaincode.invokeChaincode(username, channelName, contractName, functionName, arguments,req,res)
            return invoke
            } else if (functionName === 'UpdateWalletDetails'){
                console.log("functionName", functionName)
                //For UpdateWalletDetails
                var arguments = [req.body.id, req.body.fieldName, req.body.value]
                let invoke = await invokeChaincode.invokeChaincode(username, channelName, contractName, functionName, arguments,req,res)
            return invoke
            } else if (functionName === 'AddFunds'){
                console.log("functionName", functionName)
                //For AddFunds to Wallet
                var arguments = [req.body.id, req.body.amount]
                let invoke = await invokeChaincode.invokeChaincode(username, channelName, contractName, functionName, arguments,req,res)
            return invoke
            } else if (functionName === 'TransferFunds'){
                console.log("functionName", functionName)
                //For TransferFunds to Wallet
                var arguments = [req.body.fromid, req.body.toid,req.body.amount]
                let invoke = await invokeChaincode.invokeChaincode(username, channelName, contractName, functionName, arguments,req,res)
            return invoke
            } else if (functionName === 'WithdrawFunds'){
                console.log("functionName", functionName)
                //For WithdrawFunds from Wallet
                var arguments = [req.body.id, req.body.amount]
                let invoke = await invokeChaincode.invokeChaincode(username, channelName, contractName, functionName, arguments,req,res)
            return invoke
            } else if (functionName === 'DeleteWallet'){
                console.log("functionName", functionName)
                //For DeleteWallet
                var arguments = [req.body.id]
                let invoke = await invokeChaincode.invokeChaincode(username, channelName, contractName, functionName, arguments,req,res)
            return invoke
            } else {
                return res.status(500).send('Invaild Function inside Service')
            } 

            
        } catch (error) {
        console.log("error", error)
        throw error
        }
    },
    queryChaincode: async (req, res)=>{
        console.log('Inside Query Chaincode Service')
        try {
            let username = req.body.name
            let channelName = req.body.channelName
            let contractName = req.body.contractName
            let functionName =  req.body.functionName
            let uniqueId = req.body.id
            let query = await queryWalletDetails.queryWalletDetails(username, channelName, contractName, functionName, uniqueId, req,res)
            return query
        } catch (error) {
        console.log("error", error)
        throw error
        }        
    }
}