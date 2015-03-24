fueloChromeApp.updateFavoriteFuelInformation = function (fuelType) {
    var deferred = Q.defer();

    fueloChromeApp.services.getAveragePrice(fuelType).then(function (result) {
        localStorage.favoriteFuelInfo = JSON.stringify({
            fuelType: fuelType,
            cachedValue: result.price,
            lastUpdated: moment().startOf('day')
        });
        deferred.resolve(result);
    });

    return deferred.promise;
};