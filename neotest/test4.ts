//invoke script

const {default: Neon, api, wallet, u, rpc} = require("@cityofzion/neon-js");
import {privKey2} from "./pri";

const sendingKey = privKey2;
const apiProvider = new api.neoscan.instance("TestNet");
const account = new wallet.Account(sendingKey);
// const config = {
//     scriptHash: "f0c1f15cb3b7ec9466e63aff988aab4083e80dd1",
//     operation: "balanceOf",
//     args: [u.str2hexstring("AGCZsNnK1XQCKLueMsrhJtB8xXDk53y7YB")]
// };
function signTx(tx, publicKey) {
    // Sign tx and attach signature onto tx
    // The publicKey passed in is used as a check to ensure that the private and public keys match.

    return new Promise(resolve =>
        resolve(wallet.sign(tx, sendingKey))
    );
}

const config = {
    api: apiProvider,
    script: Neon.create.script({
        scriptHash: 'f0c1f15cb3b7ec9466e63aff988aab4083e80dd1',
        operation: 'transferFrom',
        args: [u.str2hexstring("AGCZsNnK1XQCKLueMsrhJtB8xXDk53y7YB"), u.str2hexstring("ASmpTmH6Wg5nwtxoCeXRS68ocqBJgk2rTQ"), 13]
    }),
    account,
    address: "ASmpTmH6Wg5nwtxoCeXRS68ocqBJgk2rTQ",
    publicKey: account.publicKey,
    // signingFunction: signTx,
    gas: 0
};
let i = {
    scriptHash: 'f0c1f15cb3b7ec9466e63aff988aab4083e80dd1',
    operation: 'banlanceOf',
    args: [u.str2hexstring("AGCZsNnK1XQCKLueMsrhJtB8xXDk53y7YB")]
};
const script = Neon.create.script(i);
// Neon.u.reverseHex()
// Neon.doInvoke(config).then(res => {
//     console.log(res);
// });
console.log(script);
rpc.Query.invokeScript(script)
    .execute("https://test4.cityofzion.io:443")
    .then(res => {
        if (res.result.stack[0].value !== '') {
            console.log(u.Fixed8.fromReverseHex(res.result.stack[0].value));
            console.log(u.Fixed8.fromReverseHex(res.result.stack[0].value));
        }else{
            console.log(JSON.stringify(res));
        }
    });
