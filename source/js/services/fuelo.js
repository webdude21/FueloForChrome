if (!fueloChromeApp) {
    fueloChromeApp = {};
}

fueloChromeApp.services = (function () {
    'use strict';
    var httpRequester = fueloChromeApp.httpRequester,
        API_KEY = '2aa197c518fe4da',
        BASE_URL = 'http://fuelo.net/api/',
        fuel = {
            gasoline: 'gasoline',
            diesel: 'diesel',
            lpg: 'lpg',
            methane: 'methane'
        };

    return {
        getAveragePrice: function (fuelType, date){
            fuelType = fuelType || fuel.gasoline;
            var requestURL = BASE_URL + 'price?key=' + API_KEY + '&fuel=' + fuelType;
            return httpRequester.getJSON(requestURL);
        },
        fuelType: fuel
    }
}());