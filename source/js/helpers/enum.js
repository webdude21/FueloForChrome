var fueloChromeApp = {};
(function (fueloChromeApp) {
    fueloChromeApp.Enum = (function () {
        function _validateInput(stringArr) {
            if (!stringArr) {
                throw new Error('You should provide an array of strings in order to produce an Enum');
            }
        }

        function Enum(stringArr) {
            var that = this;
            _validateInput(stringArr);

            stringArr.forEach(function (key) {
                that[key] = key;
            });

            return that;
        }

        return Enum;
    }());
}(fueloChromeApp));