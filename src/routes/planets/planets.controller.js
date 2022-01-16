const {planets} = require("../../models/planets.model");

function getAllPlanets(request, response) {
    return response.json(planets);
}

module.exports = {
    getAllPlanets,
};