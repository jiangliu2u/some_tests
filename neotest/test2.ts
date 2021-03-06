
//NEP5智能合约转账
const { default: Neon, api, wallet,u} = require("@cityofzion/neon-js");
const sb = Neon.create.scriptBuilder();
import { privKey } from "./pri";
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

// Build script to call 'name' from contract at 5b7074e873973a6ed3708862f219a6fbf4d1c411
const config = {
    api:apiProvider,
    script: Neon.create.script({
        scriptHash: 'f0c1f15cb3b7ec9466e63aff988aab4083e80dd1',
        operation: 'transfer',
        args: [u.str2hexstring(account.address),u.str2hexstring("ASmpTmH6Wg5nwtxoCeXRS68ocqBJgk2rTQ"),123]
    }),
    address: account.address,
    account,
    privateKey: account.privateKey,
    gas: 0
};
console.log(u.str2hexstring(account.address))
console.log(u.str2hexstring("ASmpTmH6Wg5nwtxoCeXRS68ocqBJgk2rTQ"))
Neon.doInvoke(config)
    .then(config => {
        console.log("\n\n--- Response ---");
        console.log(config.response);
        console.log(typeof config.response);
    })
    .catch(config => {
        console.log(config);
    });