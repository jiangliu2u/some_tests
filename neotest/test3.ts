const {default: Neon, api, wallet, u,rpc} = require("@cityofzion/neon-js");
const sb = Neon.create.scriptBuilder();
import {privKey2} from "./pri";

const sendingKey = privKey2;
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

// Build script to call 'name' from contract at 5b7074e873973a6ed3708862f219a6fbf4d1c411
const config = {
    api: apiProvider,
    script: Neon.create.script({
        scriptHash: 'f0c1f15cb3b7ec9466e63aff988aab4083e80dd1',
        operation: 'tranferFrom',
        args: [u.str2hexstring(account.address), u.str2hexstring("AGCZsNnK1XQCKLueMsrhJtB8xXDk53y7YB"), u.str2hexstring(account.address), 1234567]
    }),
    address: account.address,
    account,
    privateKey: account.privateKey,
    gas: 0
};
console.log(config)
Neon.doInvoke(config)
    .then(config => {
        console.log("\n\n--- Response ---");
        console.log(config.response);
        console.log(typeof config.response);
    })
    .catch(config => {
        console.log(config);
    });