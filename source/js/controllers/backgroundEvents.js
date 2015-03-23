(function () {
    var persistentStorage = localStorage.fueloChromeApp,
        updateFavoriteFuelInfo = fueloChromeApp.updateFavoriteFuelInformation;

    function _drawIcon() {
        chrome.browserAction.setBadgeBackgroundColor({color: [208, 0, 24, 255]});
        chrome.browserAction.setBadgeText({
            text: persistentStorage.favoriteFuelInfo.cachedValue
        });
    }

    function updateIcon() {
        if (persistentStorage.favoriteFuelInfo && persistentStorage.favoriteFuelInfo.fuelType) {
            if (!persistentStorage.cachedValue || moment.diff(persistentStorage.lastUpdate, 'days') > 1) {
                updateFavoriteFuelInfo.then(function () {
                    _drawIcon();
                });
            } else {
                _drawIcon();
            }
        }
    }

    if (chrome.runtime && chrome.runtime.onStartup) {
        chrome.runtime.onStartup.addListener(function () {
            updateIcon();
        });
    }
}());

