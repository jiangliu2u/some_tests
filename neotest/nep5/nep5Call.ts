import {privKey} from "../pri"

const thinNeo = require("nel-neo-thinsdk");
const ThinNeo = global["ThinNeo"];
const Neo = global["Neo"];

const sendingKey = privKey;
const pubkey = "7591573bc37d79bf9eea67d6335a2d868573e5ad85bd731815e9f278d0dd0688";
const receivingAddress = "ASmpTmH6Wg5nwtxoCeXRS68ocqBJgk2rTQ";
const contractScriptHash = "e74c1bb22522f44819bd7bfd55a9045cb68b5488";
const address = "AGCZsNnK1XQCKLueMsrhJtB8xXDk53y7YB";
sendNep5().then(console.log)

async function sendNep5() {
    const tran = new ThinNeo.Transaction();

    // 合约类型
    tran.inputs = [];
    tran.outputs = [];
    tran.type = ThinNeo.TransactionType.InvocationTransaction;
    tran.extdata = new ThinNeo.InvokeTransData();

    const sb = new ThinNeo.ScriptBuilder();

    // 生成随机数
    let random_int;
    try {
        const array = new Uint8Array(2333);
        const random_uint8 = Neo.Cryptography.RandomNumberGenerator.getRandomValues(array);
        random_int = Neo.BigInteger.fromUint8Array(random_uint8);
    } catch (e) {
        const math_rand = parseInt((Math.random() * 10000000).toString());
        console.log('[Bla Cat]', '[wallet]', 'makerawtransaction, math_rand => ', math_rand);
        random_int = new Neo.BigInteger(math_rand);
    }

    // 塞入随机数
    sb.EmitPushNumber(random_int);
    sb.Emit(ThinNeo.OpCode.DROP);
    sb.EmitParamJson(["(address)" + address, "(address)" + receivingAddress, "(integer)" + 2330])
    sb.EmitPushString("transfer");
    sb.EmitAppCall(hexToBytes(contractScriptHash)); //Asset contract


    // 塞入脚本
    tran.extdata.script = sb.ToArray();
    tran.attributes = new Array(1);
    tran.attributes[0] = new ThinNeo.Attribute();
    tran.attributes[0].usage = ThinNeo.TransactionAttributeUsage.Script;
    tran.attributes[0].data = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(
        address
    );

    if (tran.witnesses == null) tran.witnesses = [];
    const msg = tran.GetMessage().clone();

    const signdata = ThinNeo.Helper.Sign(msg, privKey);
    tran.AddWitness(signdata, pubkey, address);

    let txid = "0x" + tran.GetHash().clone().reverse().toHexString();
    const data: Uint8Array = tran.GetRawData();

    const hex = (data as any).toHexString();
    console.log(hex);

    return JSON.stringify({txid, hex});
}

function hexToBytes(aa) {
    if ((aa.length & 1) != 0)
        throw new RangeError();
    var str = aa;
    if (aa.length >= 2 && aa[0] == '0' && aa[1] == 'x')
        str = aa.substr(2);
    var bytes = new Uint8Array(str.length / 2);
    for (var i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(str.substr(i * 2, 2), 16);
    }
    return bytes;
}