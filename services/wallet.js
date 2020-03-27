const enrollAdmin = require('../sdk/enrollAdmin');
const registerUser = require('../sdk/registerUser');
const invokeChaincode = require('../sdk/invoke');
const queryWalletDetails = require('../sdk/query');


module.exports = {
    //Enroll Admin needs to be called only once
    registerAdmin: async ()=>{
        console.log("Inside Enroll Admin Service");
        try {
            let enroll = await enrollAdmin.enrollAdmin()
            return enroll
          } catch (error) {
            console.log("error", error)
            throw error
        }
    },
    registerUser: async (username)=>{
        console.log("Inside Register User Service")        
        try {
            let reg = await registerUser.registerUser(username)
            return reg
        } catch (error) {
            console.log("error", error)
            throw error
        }
    },
    invokeChaincode: async (username, channelName, contractName, functionName, arguments)=>{
        console.log('Inside Invoke Chaincode Service')
        try {
            let invoke = await invokeChaincode.invokeChaincode(username, channelName, contractName, functionName, arguments)
            
            return invoke
        } catch (error) {
        console.log("error", error)
        throw error
        }
    },
    queryChaincode: async (username, channelName, contractName, functionName, uniqueId )=>{
        console.log('Inside Query Chaincode Service')
        try {
            let query = await queryWalletDetails.queryWalletDetails(username, channelName, contractName, functionName, uniqueId )
            return query
        } catch (error) {
        console.log("error", error)
        throw error
        }        
    }
}