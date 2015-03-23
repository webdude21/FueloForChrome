(function () {
    var persistentStorage = localStorage.favoriteFuelInfo,
        updateFavoriteFuelInfo = fueloChromeApp.updateFavoriteFuelInformation;

    function _drawIcon() {
        chrome.browserAction.setBadgeBackgroundColor({color: [208, 0, 24, 255]});
        chrome.browserAction.setBadgeText({
            text: "1,29 "
        });
    }

    function updateIcon() {
        if (persistentStorage && persistentStorage.fuelType) {
            //  || moment.diff(persistentStorage.lastUpdate, 'days') >= 1
            if (!persistentStorage.cachedValue) {
                updateFavoriteFuelInfo(persistentStorage.fuelType).then(function (result) {
                    persistentStorage.cachedValue = result.price;
                    _drawIcon();
                });
            } else {
                _drawIcon();
            }
        }
    }

    if (chrome.runtime && chrome.runtime.onStartup) {
        chrome.runtime.onStartup.addListener(updateIcon);
        chrome.runtime.onMessage.addListener(function(input){
            persistentStorage = input;
            updateIcon();
        });
    }
}());

