(function ($, window, chrome, fueloChromeApp, dateUtil, googleAnalytics) {
    var fuelTypesForUI = [{value: 'gasoline', text: 'Бензин'},
            {value: 'diesel', text: 'Дизел'},
            {value: 'lpg', text: 'Пропан бутан'},
            {value: 'methane', text: 'Метан'}],
        services = fueloChromeApp.services,
        UI_DATE_FORMAT = 'yy-mm-dd',
        click = 'click',
        load = 'load',
        $fuelTypesSelect = $('#fuel-types'),
        $getPricesButton = $('#get-prices'),
        $setFavoriteFuelButton = $('#set-as-favorite'),
        $resultContainer = $('#result-field'),
        $datePicker = $('.date-picker'),
        $navBarLink = $('#nav-bar-link'),
        authorLink = 'https://github.com/webdude21/FueloForChrome';

    function addToDropDown(item) {
        $fuelTypesSelect.append('<option value="' + item.value + '">' + item.text + '</option>');
    }

    function trackButtonClick(event) {
        googleAnalytics.push(['_trackEvent', event.target.id, 'clicked']);
    }

    function retrieveInformationFromService() {
        var date = dateUtil($datePicker.val());
        services.getAveragePrice($fuelTypesSelect.val(), date).then(renderResult);
    }

    function renderResult(result) {
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

    function saveUserPreferences() {
        chrome.runtime.sendMessage({
            fuelType: $fuelTypesSelect.val(),
            lastUpdated: dateUtil().startOf('day')
        });
    }

    function forewordToWebStore() {
        chrome.tabs.create({url: authorLink});
    }

    function renderView() {
        $datePicker.datepicker({dateFormat: UI_DATE_FORMAT, showButtonPanel: true});
        fuelTypesForUI.forEach(addToDropDown);
        $getPricesButton.on(click, retrieveInformationFromService);
        $getPricesButton.on(click, trackButtonClick);
        $setFavoriteFuelButton.on(click, saveUserPreferences);
        $navBarLink.on(click, forewordToWebStore);
    }

    $(window).on(load, renderView);
}($, window, chrome, fueloChromeApp, moment, _gaq));