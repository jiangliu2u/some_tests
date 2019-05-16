const { default: Neon, api, wallet,u} = require("@cityofzion/neon-js");

let result;
(async() =>{
    try {
        const res = await Neon.create.rpcClient("https://api.nel.group/api/testnet", "2.10.0").query({
            "jsonrpc": "2.0",
            "method": "getnep5transferbytxid",
            "params": ["e5a520b0b1541f1d9f0218804faf783ac8e833d8b512136f9ddad9766cb3ed63", 1],
            "id": 1
        }, null);
        result = res["result"][0];
        console.log(result);
    } catch (e) {
        console.error(e);
    }
})();
