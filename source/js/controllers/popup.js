(function () {
    var fuelTypesForUI = [{value: 'gasoline', text: 'Бензин'},
            {value: 'diesel', text: 'Дизел'},
            {value: 'lpg', text: 'Пропан бутан'},
            {value: 'methane', text: 'Метан'}],
        services = fueloChromeApp.services,
        UI_DATE_FORMAT = "yy-mm-dd",
        $fuelTypesSelect = $('#fuel-types'),
        $getPricesButton = $('#get-prices'),
        $setFavoriteFuelButton = $('set-as-favorite'),
        updateFavoriteFuelInfo = fueloChromeApp.updateFavoriteFuelInformation,
        $resultContainer = $('#result-field'),
        $datePicker = $(".date-picker"),
        $navBarLink = $('#nav-bar-link'),
        authorLink = 'https://github.com/webdude21/FueloForChrome';

    function _renderFuelTypesDropDown() {
        fuelTypesForUI.forEach(function (item) {
            $fuelTypesSelect.append('<option value="' + item.value + '">' + item.text + '</option>');
        });
    }

    function _trackButtonClick(e) {
        _gaq.push(['_trackEvent', e.target.id, 'clicked']);
    }

    function _retrieveInformationFromService() {
        var date = moment($datePicker.val());
        services.getAveragePrice($fuelTypesSelect.val(), date).then(function (result) {
            _renderResult(result);
        });
    }

    function _renderResult(result) {
        var resultText,
            $resultHTML,
            querySuccess = (result.status === 'OK');

        resultText = querySuccess ? 'Средна цена: ' + result.price + ' ' + result.dimension : result.error_message;

        $resultHTML = $('<div class="alert alert-dismissible">' +
        '<button type="button" class="close" data-dismiss="alert">×</button>' +
        '<strong>' + resultText + '</strong></div>');

        if (querySuccess) {
            $resultHTML.addClass('alert-success');
        } else {
            $resultHTML.addClass('alert-danger');
        }

        $resultContainer.html('');
        $resultContainer.append($resultHTML);
    }

    function forewordToWebStore() {
        chrome.tabs.create({url: authorLink});
    }

    function renderView() {
        $datePicker.datepicker({dateFormat: UI_DATE_FORMAT, showButtonPanel: true});
        _renderFuelTypesDropDown();
        $getPricesButton.on('click', _retrieveInformationFromService);
        $getPricesButton.on('click', _trackButtonClick);
        $setFavoriteFuelButton.on('click', updateFavoriteFuelInfo);
        $navBarLink.on('click', forewordToWebStore);
    }

    $(window).on('load', renderView);
}());