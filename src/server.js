const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');
const {loadPlanetsData} = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const MONGO_URL = 'mongodb+srv://nasa-api:iR9HHfyJSN8NqsV@nasacluster.yp8sy.mongodb.net/nasa?retryWrites=true&w=majority';

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('MongoDb is ready...')
});

mongoose.connection.on('error', (error) => {
    console.error(error);
});

async function startServer() {
    await mongoose.connect(MONGO_URL);
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
}

startServer();