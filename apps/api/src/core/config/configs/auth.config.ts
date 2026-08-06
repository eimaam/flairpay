export default () => ({
    auth: {
        jwtSecret: process.env.JWT_SECRET,

        jwtExpiresIn: process.env.JWT_REFRESH_EXPIRATION,

        refreshSecret: process.env.JWT_REFRESH_SECRET,

        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRATION,
    },
});