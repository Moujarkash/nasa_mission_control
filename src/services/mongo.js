const mongoose = require('mongoose');

mongoose.connection.once('open', () => {
  console.log('MongoDb is ready...');
});

mongoose.connection.on('error', (error) => {
  console.error(error);
});

async function mongoConnect() {
  const MONGO_URL = process.env.MONGO_URL;

  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
