import * as redis from "./redis";

export async function start(){
    redis.init({
        port: 6379,
        host: "127.0.0.1",
        password: "string",
        db : 0
    });
}
