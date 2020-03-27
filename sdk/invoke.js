/*
 * SPDX-License-Identifier: Apache-2.0
 */

// 'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

module.exports.invokeChaincode = async (username, channelName, contractName, functionName, arguments)=> {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '.', 'server-connection.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        let arrayOfArgs = Object.values(arguments)
        console.log('arrayOfArgs', typeof arrayOfArgs.join())

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(username);
        if (!identity) {
            console.log('An identity for the user ',username,' does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return 'An identity for the user '+username+' does not exists in the wallet';
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: username, discovery: { enabled: true, asLocalhost: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channelName);

        // Get the contract from the network.
        const contract = network.getContract(contractName);

        // Submit the specified transaction.
        
        //            Usage of Functions
        
        /*---------------Create Wallet FunctionName: CreateWallet: Fields: 11
          
            await contract.submitTransaction('CreateWallet',['UniqueId','MobileNO','CreatedFrom','WalletType','WalletBalance','Hours']);
        
        CreateWallet Example:
            await contract.submitTransaction('CreateWallet',['2','9033121234','Sosh','Bussiness','1000','130']);
        */


        /*----------------Update Wallet FunctionName: UpdateWalletDetails: Fields:3
            
            await contract.submitTransaction('UpdateWalletDetails',['UniqueId', 'WalletFieldInCapital', 'UpdatedVale']);
        
        WalletFields: 
            ID
            MOBILENO
            CREATEDFROM
            TYPE
            AMOUNT
            HOURS
            

        UpdateWallet Example:
            await contract.submitTransaction('UpdateWalletDetails',['1', 'Type', 'Bussiness']);
        */

        /*--------------Delete Wallet FunctionName: DeleteWallet: Fields:1
            await contract.submitTransaction('DeleteWallet','UniqueId');

        DeleteWallet Example:
            await contract.submitTransaction('DeleteWallet','1');
        */

        /*-------------Add Funds to wallelt FunctionName: AddFunds: Fields:2
            await contract.submitTransaction('AddFunds',['UniqueId','Amount']);
        */

        /*------------Transferfunds to wallet FunctionName: TransferFunds Fields:3
            await contract.submitTransaction('TransferFunds',['FromUniqueId','ToUniqueId','Amount']);
        */

        /*------------WithdrawFunds to wallet FunctionName: WithdrawFunds Fields:2
            await contract.submitTransaction('WithdrawFunds',['UniqueId','Amount']);
        */

        let result = await contract.submitTransaction(functionName, ...arrayOfArgs);
        // Disconnect from the gateway.
        await gateway.disconnect();

        return result.toString()
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return error
        process.exit(1);
    }
}

