(function(){
    var persistentStorage = localStorage.favoriteFuelInfo,
        updateFavoriteFuelInfo = fueloChromeApp.updateFavoriteFuelInformation;

    function drawIcon(text) {
        chrome.browserAction.setBadgeBackgroundColor({color: [200, 0, 0, 200]});
        chrome.browserAction.setBadgeText({
            text: text
        });
    }

    function updateIcon() {
        var savedData = loadSavedData();
        if (savedData && savedData.fuelType) {
            if (savedData.cachedValue && dataIsFromToday(savedData.lastUpdated)) {
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

    function dataIsFromToday(data){
        return moment(data).add(1, 'days') > moment().endOf('day');
    }

    function saveChanges(dataToSave) {
        persistentStorage = JSON.stringify(dataToSave);
    }

    function loadSavedData() {
        return JSON.parse(persistentStorage);
    }

    if (chrome.runtime && chrome.runtime.onStartup) {
        chrome.runtime.onStartup.addListener(updateIcon);
        chrome.runtime.onMessage.addListener(function (input) {
            saveChanges(input);
            updateIcon();
        });
    }
}());