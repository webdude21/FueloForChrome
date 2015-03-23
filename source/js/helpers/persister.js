if (!fueloChromeApp) {
    var fueloChromeApp = {};
}

fueloChromeApp.updateFavoriteFuelInformation = (function () {
    var $fuelTypesSelect = $('#fuel-types'),
        persistentStorage = localStorage.fueloChromeApp,
        services = fueloChromeApp.services;

    return services.getAveragePrice($fuelTypesSelect.val()).then(function (result) {
            persistentStorage.favoriteFuelInfo = {
                fuelType: $fuelTypesSelect.val(),
                cachedValue: result.price,
                lastUpdated: moment().startOf('day')
            };
        });
}());