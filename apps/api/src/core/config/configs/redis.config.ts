import { CACHE_CONSTANTS, CACHE_TTL } from "../../redis/redis.constants";

export default () => ({
    redis: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        uri: process.env.REDIS_URI || undefined,
        port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
        username: process.env.REDIS_USERNAME || undefined,
        password: process.env.REDIS_PASSWORD || undefined,
        db: parseInt(process.env.REDIS_DB ?? '0', 10),
    },
    cache: {
        ttl: CACHE_TTL,
        constants: CACHE_CONSTANTS,
    },
})
