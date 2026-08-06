export default () => ({
    database: {
        uri: process.env.MONGODB_URI,

        name: process.env.MONGODB_DATABASE,

        autoIndex: process.env.NODE_ENV !== 'production',
    },
});