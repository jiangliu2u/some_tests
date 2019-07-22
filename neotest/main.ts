import {privKey} from "./pri"
import {tx} from "@cityofzion/neon-js";

const {default: Neon, api, wallet, sc, nep5,u} = require("@cityofzion/neon-js");

const sendingKey = privKey;
const receivingAddress = "ASmpTmH6Wg5nwtxoCeXRS68ocqBJgk2rTQ";
const contractScriptHash = "e74c1bb22522f44819bd7bfd55a9045cb68b5488";
const additionalInvocationGas = 0;
const additionalIntents = [];
const apiProvider = new api.neoscan.instance("TestNet");

console.log(apiProvider);
const account = new wallet.Account(sendingKey);

const generator = nep5.abi.transfer(contractScriptHash, account.address, receivingAddress, 230);//数量最后会乘以Decimals 4位小数就会乘以10^4
const builder = generator();
const script = builder.str;
let nx = createTxForNEP5("AGCZsNnK1XQCKLueMsrhJtB8xXDk53y7YB",receivingAddress,contractScriptHash,23,1);
nx.sign(account);
let script_sig = nx.serialize(true);
console.log(JSON.stringify(script_sig));
const config = {
    api: apiProvider, // The API Provider that we rely on for balance and rpc information
    account: account, // The sending Account
    intents: additionalIntents, // Additional intents to move assets
    script: script, // The Smart Contract invocation script
    gas: additionalInvocationGas // Additional GAS for invocation.
};
// Neon.doInvoke(config)
//     .then(config => {
//         console.log("--- Response ---");
//         console.log(config.response['txid']);
//     })
//     .catch(config => {
//         console.log(config);
//     });

function createTxForNEP5(from: string, to: string, scriptHash: string, amount: number, decimals: number) {
    const fromScript = wallet.getScriptHashFromAddress(from);
    const toScript = wallet.getScriptHashFromAddress(to);
    if (fromScript.length != 40 || toScript.length != 40) {
        throw new Error('target address error');
    }
    const newTx = new tx.InvocationTransaction();
    newTx.script = sc.createScript({
        scriptHash: scriptHash.startsWith('0x') && scriptHash.length == 42 ? scriptHash.substring(2) : scriptHash,
        operation: 'transfer',
        args: [
            u.reverseHex(fromScript),
            u.reverseHex(toScript),
            amount * Math.pow(10, decimals)
        ]
    }) + 'f1';
    newTx.addAttribute(tx.TxAttrUsage.Script, u.reverseHex(fromScript));
    const uniqTag = `${new Date().getTime()}`;
    newTx.addAttribute(tx.TxAttrUsage.Remark1, u.reverseHex(u.str2hexstring(uniqTag)));
    return newTx;
}

