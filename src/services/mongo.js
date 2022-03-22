const mongoose = require('mongoose');
const config = require('../../config/config.js');

mongoose.connection.once('open', () => {
    console.log('MongoDb is ready...')
});

mongoose.connection.on('error', (error) => {
    console.error(error);
});

async function mongoConnect() {
    await mongoose.connect(config.MONGO_URL);
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
};