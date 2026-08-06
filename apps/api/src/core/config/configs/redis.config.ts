const CACHE_TTL = {
    ONE_MINUTE: 60,
    ONE_HOUR: 60 * 60,
    ONE_DAY: 60 * 60 * 24,
    ONE_WEEK: 60 * 60 * 24 * 7,
    ONE_MONTH: 60 * 60 * 24 * 30,
    ONE_YEAR: 60 * 60 * 24 * 365,
}

const CACHE_CONSTANTS = {
    USER: (id: string) => `user:${id}`,
    PRODUCT: (id: string) => `product:${id}`,
    CATEGORY: (id: string) => `category:${id}`,
    BRAND: (id: string) => `brand:${id}`,
}


export default () => ({
    redis: {
        uri: process.env.REDIS_URI,
        port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
        db: parseInt(process.env.REDIS_DB ?? '0', 10),
    },
    cache: {
        ttl: CACHE_TTL,
        constants: CACHE_CONSTANTS,
    },
})
