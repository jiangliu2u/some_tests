import {privKey} from "./pri"

const {default: Neon, api, wallet, sc, nep5} = require("@cityofzion/neon-js");

// console.log(config);
for (let i = 0; i < 1; i++) {

    const sendingKey = privKey;
    const receivingAddress = "ASmpTmH6Wg5nwtxoCeXRS68ocqBJgk2rTQ";
    const contractScriptHash = "210d382618958e01db4b1fd48f5316d75dfb80a3";
    const additionalInvocationGas = 0;
    const additionalIntents = [];
    const apiProvider = new api.neoscan.instance("TestNet");

    console.log(apiProvider);
    const account = new wallet.Account(sendingKey);

    const generator = nep5.abi.transfer(contractScriptHash, account.address, receivingAddress, 23);//数量最后会乘以Decimals 4位小数就会乘以10^4
    const builder = generator();
    const script = builder.str;
    const config = {
        api: apiProvider, // The API Provider that we rely on for balance and rpc information
        account: account, // The sending Account
        intents: additionalIntents, // Additional intents to move assets
        script: script, // The Smart Contract invocation script
        gas: additionalInvocationGas // Additional GAS for invocation.
    };
    Neon.doInvoke(config)
        .then(config => {
            console.log("--- Response ---");
            console.log(config.response['txid']);
        })
        .catch(config => {
            console.log(config);
        });
}
