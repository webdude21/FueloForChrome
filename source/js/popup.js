(function () {
    var fuelTypes = fueloChromeApp.services.fuelTypes,
        services = fueloChromeApp.services,
        $fuelTypesSelect = $('#fuel-types'),
        $getPricesButton = $('#get-prices');

    function _renderFuelTypesDropDown() {
        fuelTypes.forEach(function (item) {
            $fuelTypesSelect.append('<option value="' + item + '">' + item + '</option>')
        })
    }

    function _getPricesButtonClick() {
        services.getAveragePrice($fuelTypesSelect.val()).then(function (result){
            console.log(result);
        });

    }

    function renderView() {
        _renderFuelTypesDropDown();
        $getPricesButton.on('click', _getPricesButtonClick);
    }

    $(window).on('load', renderView);
}());