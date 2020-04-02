/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');


module.exports.queryWalletDetails = async (username, channelName, contractName, functionName, UniqueId)=> {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '.', 'network-connection.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(username);
        if (!identity) {
            console.log('An identity for the user ',username,' does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return 'An identity for the user '+username+' does not exist in the wallet';
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: username, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channelName);

        // Get the contract from the network.
        const contract = network.getContract(contractName);

        /*-----------------QueryWallet Details
            await contract.evaluateTransaction('QueryWalletData','UniqueId')
        */
        const result = await contract.evaluateTransaction(functionName, UniqueId);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        let result1 = JSON.parse(result.toString())
        return result1
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return error
        process.exit(1);
    }
}