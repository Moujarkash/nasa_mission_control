const {getAllPlanets} = require("../../models/planets.model");

function httpGetAllPlanets(request, response) {
    return response.json(getAllPlanets());
}

module.exports = {
    httpGetAllPlanets,
};