fueloChromeApp.updateFavoriteFuelInformation = function (fuelType) {
    return fueloChromeApp.services.getAveragePrice(fuelType)
        .then(function (result) {
            localStorage.favoriteFuelInfo = {
                fuelType: fuelType,
                cachedValue: result.price,
                lastUpdated: moment().startOf('day')
            };
        });
};