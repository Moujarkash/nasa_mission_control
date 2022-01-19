const {getAllLaunches, addNewLaunch, existLaunchWithId, abortLaunch} = require("../../models/launches.model");

function httpGetAllLaunches(request, response) {
    return response.json(getAllLaunches());
}

function httpAddNewLaunch(request, response) {
    const launch = request.body;

    if (!launch.mission || !launch.rocket || !launch.target || !launch.launchDate) {
        return response.status(400).json({
            error: 'Missing required launch property'
        });
    }

    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return response.status(400).json({
            error: 'Invalid Date'
        });
    }

    addNewLaunch(launch);
    return response.status(201).json(launch);
}

function httpAbortLaunch(request, response) {
    const launchId = Number(request.params.id);
    if (!existLaunchWithId(launchId)) {
        return response.status(404).json({
            error: "Not Found"
        });
    }

    const abortedLaunch = abortLaunch(launchId);
    return response.json(abortedLaunch);
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
};