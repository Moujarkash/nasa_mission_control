const launches = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

async function existLaunchWithId(id) {
    return launches.findOne({
        flightNumber: id,
    });
}

async function getAllLaunches() {
    return launches.find({}, {
        _id: 0, __v: 0,
    });
}

async function getLatestFlightNumber() {
    const latestLaunch = await launches.findOne({}).sort('-flightNumber');

    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber;
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if (!planet) {
        throw new Error('No matching planet found');
    }

    await launches.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true
    });
}

async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['NASA', 'NOAA'],
        flightNumber: newFlightNumber,
    });

    await saveLaunch(newLaunch);
}

async function abortLaunch(id) {
    const aborted = await launches.updateOne({
        flightNumber: id,
    }, {
        success: false,
        upcoming: false,
    });

    return aborted.matchedCount === 1 && aborted.modifiedCount === 1;
}

module.exports = {
    existLaunchWithId,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunch
};