import * as  IORedis from "ioredis";

export interface RedisConfig {
    port: number,
    host: string,
    password: string,
    db? : number
}

export let redis:IORedis;

export  function init(config:RedisConfig) {
    const options = {
        lazyConnect: true,
        port: config.port,          // Redis port
        host: config.host,   // Redis host
        family: 4,           // 4 (IPv4) or 6 (IPv6)
        password: config.password,
        db: config.db || 0
    };
    redis = new IORedis(options);
}