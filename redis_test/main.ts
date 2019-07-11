import {redis} from "./redis";
import * as init from "./init";

const Redis = require("ioredis");

let redisa = new Redis({
    port: 6379,
    host: "123.207.216.34",
    password: "lostjoker",
    db: 12
});

(async ()=>{
    for(let i =0 ;i<100;i++){
    await redisa.del(`player:${i}:pools`);
    }
    process.exit()
})();




//let offset = 0;
//let canvas = new Uint8Array(4);
//my设置为 bitfield my set u4 #0 1 # 2 12
//redisa.getBuffer("my", function (err, r) {
 //   console.log(r);
 //   let b = new Uint8Array(r,0);
 //   console.log(b.byteLength);
//    console.log("=============");
  //  for (let i = 0; i < b.byteLength; i++) {
  //      console.log(b[i] >> 4);
  //      console.log(b[i] & 15);
  //      //1byte可以表示两个值
  //      canvas[offset + 2 * i] = b[i] >> 4;//高位
  //      canvas[offset + 2 * i + 1] = b[i] & 15;//低位
   // }
   // offset = b.byteLength * 2;
//});
