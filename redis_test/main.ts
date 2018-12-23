import {redis} from "./redis";
import * as init from "./init";

const Redis = require("ioredis");

let redisa = new Redis({
    port: 6379,
    host: "127.0.0.1",
    password: "jiangliu2u",
    db: 0
});
let offset = 0;
let canvas = new Uint8Array(4);
//my设置为 bitfield my set u4 #0 1 # 2 12
redisa.getBuffer("my", function (err, r) {
    console.log(r);
    let b = new Uint8Array(r,0);
    console.log(b.byteLength);
    console.log("=============");
    for (let i = 0; i < b.byteLength; i++) {
        console.log(b[i] >> 4);
        console.log(b[i] & 15);
        //1byte可以表示两个值
        canvas[offset + 2 * i] = b[i] >> 4;//高位
        canvas[offset + 2 * i + 1] = b[i] & 15;//低位
    }
    offset = b.byteLength * 2;
});
