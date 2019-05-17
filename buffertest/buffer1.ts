const payload = {
    url: 'haha.com',
    methodName: 'plus',
    args: [1, 2],
};
const body = Buffer.from(JSON.stringify(payload));

const header = Buffer.alloc(10);
header[0] = 0;
header.writeInt32BE(1000, 1);
header[5] = 1; // codec => 1 代表是 JSON 序列化
header.writeInt32BE(body.length, 6);

const packet = Buffer.concat([header, body], 10 + body.length);
console.log(packet);


const type = packet[0]; // => 0 (request)
const requestId = packet.readInt32BE(1); // => 1000
const codec = packet[5];
const bodyLength = packet.readInt32BE(6);

const b = packet.slice(10, 10 + bodyLength);
//ts-ignore
const results = JSON.parse(b+'');
console.log(results);