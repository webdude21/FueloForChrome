if (!fueloChromeApp) {
    fueloChromeApp = {};
}

fueloChromeApp.services = (function () {
    var httpRequester = fueloChromeApp.httpRequester,
        API_KEY = '2aa197c518fe4da',
        dateUtil = moment,
        DATE_FORMAT = 'YYYY-MM-DD',
        BASE_URL = 'http://fuelo.net/api/',
        params = {
            price: 'price',
            key: 'key',
            fuel: 'fuel',
            date: 'date'
        },
        fuelTypes = ['gasoline', 'diesel', 'lpg', 'methane'],
        fuelType = new fueloChromeApp.Enum(fuelTypes);

    return {
        getAveragePrice: function (fuelType, date) {
            fuelType = fuelType || fuelType.gasoline;
            var requestURL = httpRequester.addParams(params.key, API_KEY, BASE_URL);
            requestURL = httpRequester.addParams(params.fuel, fuelType, requestURL);

            if (dateUtil().isValid(date)) {
                date = dateUtil().format(DATE_FORMAT);
                requestURL = httpRequester.addParams(params.date, date, requestURL);
            }

            return httpRequester.getJSON(requestURL);
        },
        fuelType: fuelType,
        fuelTypes: fuelTypes
    }
}());