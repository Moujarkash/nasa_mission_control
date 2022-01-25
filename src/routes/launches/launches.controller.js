const {getAllLaunches, scheduleNewLaunch, existLaunchWithId, abortLaunch} = require("../../models/launches.model");
const {getPagination} = require("../../services/query");

async function httpGetAllLaunches(request, response) {
    const { skip, limit } = getPagination(request.query);
    const launches = await getAllLaunches(skip, limit);

    return response.json(launches);
}

async function httpAddNewLaunch(request, response) {
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

    try {
        await scheduleNewLaunch(launch);
    } catch (e) {
        console.error(e);
        return response.status(400).json({
            error: e.message
        });
    }
    return response.status(201).json(launch);
}

async function httpAbortLaunch(request, response) {
    const launchId = Number(request.params.id);
    const existLaunch = await existLaunchWithId(launchId);

    if (!existLaunch) {
        return response.status(404).json({
            error: "Not Found"
        });
    }

    const abortedLaunch = await abortLaunch(launchId);
    if (!abortedLaunch) {
        return response.status(400).json({
            error: 'Launch not aborted'
        });
    }

    return response.json('ok');
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
};