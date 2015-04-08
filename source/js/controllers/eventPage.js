(function () {
    var persistentStorage = localStorage.favoriteFuelInfo,
        updateFavoriteFuelInfo = fueloChromeApp.updateFavoriteFuelInformation,
        textColor = [200, 0, 0, 200];

    function drawIcon(text) {
        chrome.browserAction.setBadgeBackgroundColor({color: textColor});
        chrome.browserAction.setBadgeText({text: text.toString()});
    }

    function updateIcon() {
        var savedData = loadSavedData();
        if (savedData && savedData.fuelType) {
            if (savedData.cachedValue && isFromToday(savedData.lastUpdated)) {
                drawIcon(savedData.cachedValue);
            } else {
                updateFavoriteFuelInfo(savedData.fuelType).then(function (result) {
                    savedData.cachedValue = result.price;
                    saveChanges(savedData);
                    drawIcon(result.price);
                });
            }
        }
    }

    function isFromToday(data) {
        return moment(data).add(1, 'days') > moment().endOf('day');
    }

    function saveChanges(dataToSave) {
        persistentStorage = JSON.stringify(dataToSave);
    }

    function loadSavedData() {
        return JSON.parse(persistentStorage);
    }

    function readInputFromPopup(input) {
        saveChanges(input);
        updateIcon();
    }

    if (chrome.runtime && chrome.runtime.onStartup) {
        chrome.runtime.onStartup.addListener(updateIcon);
        chrome.runtime.onMessage.addListener(readInputFromPopup);
    }
}());