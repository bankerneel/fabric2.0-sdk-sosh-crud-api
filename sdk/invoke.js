/*
 * SPDX-License-Identifier: Apache-2.0
 */

// 'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

module.exports.invokeChaincode = async (username, channelName, contractName, functionName, arguments,req, res)=> {
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
            return res.status(500).send('An identity for the user ',username,' does not exists in the wallet')
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

        await contract.submitTransaction(functionName, ...arrayOfArgs);
        
        if (functionName === 'CreateWallet'){
            console.log('Wallet Details of user: '+ username + ' of id: ' + arrayOfArgs[0] +' is Created');
            res.status(200).send('Wallet Details of user: '+ username + ' of id: ' + arrayOfArgs[0] +' is created')    
        } else if (functionName === 'UpdateWalletDetails'){
            console.log('Details of id: ' + arrayOfArgs[0] +' is Updated with ' + arrayOfArgs[1] + " = " + arrayOfArgs[2] );
            res.status(200).send('Details of id: ' + arrayOfArgs[0] +' is Updated with ' + arrayOfArgs[1] + " = " + arrayOfArgs[2])    
        } else if (functionName === 'AddFunds'){
            console.log('Amount : '+ arrayOfArgs[1]+ " added in wallet id: "+ arrayOfArgs[0]);
            res.status(200).send('Amount : '+ arrayOfArgs[1]+ " added in wallet id: "+ arrayOfArgs[0])    
        } else if (functionName === 'TransferFunds'){
            console.log('Amount '+ arrayOfArgs[2] + ' transfered from ' + arrayOfArgs[0] + ' to ' + arrayOfArgsp[1] );
            res.status(200).send('Amount '+ arrayOfArgs[2] + ' transfered from ' + arrayOfArgs[0] + ' to ' + arrayOfArgsp[1] )    
        } else if (functionName === 'WithdrawFunds'){
            console.log('Amount: '+ arrayOfArgs[1] + ' withdrawn from Wallet: '+ arrayOfArgs[0]);
            res.status(200).send('Wallet Details of user: '+ username + ' of id: ' + arrayOfArgs[0] +' is created')    
        } else if (functionName === 'DeleteWallet'){
            console.log('Wallet of id: '+ arrayOfArgs[0]+ ' is deleted');
            res.status(200).send('Wallet of id: '+ arrayOfArgs[0]+ ' is deleted')
        } else {
            console.log("Invalid Function Name")
            res.status(500).send('Invalid Function Name')
        }  
        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        res.status(500).send(`Failed to submit transaction: ${error}`)
        process.exit(1);
    }
}

