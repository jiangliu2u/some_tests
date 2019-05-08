import {privKey} from "./pri"
const { default: Neon, api, wallet, sc, nep5 } = require("@cityofzion/neon-js");

const sendingKey = privKey;
const receivingAddress = "ASmpTmH6Wg5nwtxoCeXRS68ocqBJgk2rTQ";
const contractScriptHash = "f0c1f15cb3b7ec9466e63aff988aab4083e80dd1";
const numOfDecimals = 4;
const amtToSend = 1;
const network = "TestNet";
const additionalInvocationGas = 0;
const additionalIntents = [];
const apiProvider = new api.neoscan.instance("TestNet");

console.log("\n\n--- API Provider ---");
console.log(apiProvider);
const account = new wallet.Account(sendingKey);

console.log("\n\n--- Sending Address ---");
console.log(account);
const generator = nep5.abi.transfer(contractScriptHash, account.address, receivingAddress, amtToSend * numOfDecimals)
const builder = generator();
const script = builder.str;
const gas = additionalInvocationGas;
const intent = additionalIntents;
const config = {
    api: apiProvider, // The API Provider that we rely on for balance and rpc information
    account: account, // The sending Account
    intents: intent, // Additional intents to move assets
    script: script, // The Smart Contract invocation script
    gas: gas // Additional GAS for invocation.
};

Neon.doInvoke(config)
    .then(config => {
        console.log("\n\n--- Response ---");
        console.log(config.response);
    })
    .catch(config => {
        console.log(config);
    });