const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'test name',
    rocket: 'test rocket',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['NASA', 'NOAA'],
    upcoming: true,
    success: true
};

launches.set(launch.flightNumber, launch);

function existLaunchWithId(id) {
    return launches.has(id);
}

function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['NASA', 'NOAA'],
        flightNumber: latestFlightNumber,
    }));
}

function abortLaunch(id) {
    const abortedLaunch = launches.get(id);
    abortedLaunch.upcoming = false;
    abortedLaunch.success = false;

    return abortedLaunch;
}

module.exports = {
    existLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunch
};