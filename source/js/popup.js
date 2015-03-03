(function (){
    var fuelTypes = fueloChromeApp.services.fuelTypes,
        $fuelTypesContainer = $('#fuel-types'),
        $fuelTypesTemplateContainer = $('#fuel-type-template');

    function renderTemplate(){
        //var compiledTemplate = Handlebars.compile($fuelTypesTemplateContainer.html());
        //$fuelTypesContainer.html(compiledTemplate({
        //    fuelTypes: fuelTypes
        //}));
    }

    $(window).on('load', renderTemplate);

}());