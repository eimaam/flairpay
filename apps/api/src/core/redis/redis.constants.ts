export const REDIS_CLIENT = 'REDIS_CLIENT';

export const CACHE_TTL = {
    ONE_MINUTE: 60,
    ONE_HOUR: 60 * 60,
    ONE_DAY: 60 * 60 * 24,
    ONE_WEEK: 60 * 60 * 24 * 7,
    ONE_MONTH: 60 * 60 * 24 * 30,
    ONE_YEAR: 60 * 60 * 24 * 365,
}

export const CACHE_CONSTANTS = {
    USER: (id: string) => `user:${id}`,
    PRODUCT: (id: string) => `product:${id}`,
    CATEGORY: (id: string) => `category:${id}`,
    BRAND: (id: string) => `brand:${id}`,
}