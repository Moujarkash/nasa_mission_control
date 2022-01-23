const {getAllPlanets} = require("../../models/planets.model");

async function httpGetAllPlanets(request, response) {
    return response.json(await getAllPlanets());
}

module.exports = {
    httpGetAllPlanets,
};