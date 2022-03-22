require('dotenv').config({
    path: 'config/.env'
});

const config = {
    MONGO_URL: process.env.MONGO_URL
};

module.exports = config;