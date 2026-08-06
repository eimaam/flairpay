import * as Joi from "joi"
import { NodeEnvEnum } from "./config.service"


export const AppConfigValidationSchema = Joi.object({
    APP_NAME: Joi.string().required(),
    NODE_ENV: Joi.string().valid(NodeEnvEnum.DEVELOPMENT, NodeEnvEnum.PRODUCTION, NodeEnvEnum.TESTING).required(),
    PORT: Joi.number().required(),
    FRONTEND_URL: Joi.string().required(),
    API_PREFIX: Joi.string().required(),
    VERSION: Joi.string().required(),

    MONGODB_URI: Joi.string().required(),
    MONGODB_DATABASE: Joi.string().required(),

    REDIS_URI: Joi.string().uri().optional(),
    REDIS_PORT: Joi.number().optional(),
    REDIS_USERNAME: Joi.string().allow("").optional(),
    REDIS_PASSWORD: Joi.string().allow("").optional(),
    REDIS_DB: Joi.number().allow("").optional(),

    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRATION: Joi.string().required(),
    JWT_REFRESH_SECRET: Joi.string().required(),
    JWT_REFRESH_EXPIRATION: Joi.string().required(),

    R2_ACCESS_KEY_ID: Joi.string().required(),
    R2_SECRET_ACCESS_KEY: Joi.string().required(),
    R2_BUCKET_NAME: Joi.string().required(),
    R2_PUBLIC_URL: Joi.string().uri().required(),
    R2_ENDPOINT: Joi.string().uri().required(),
})