(function ($, Q, fueloChromeApp) {
    fueloChromeApp.httpRequester = (function () {
        var makeHttpRequest = function (url, type, data, headers, timeout) {
            var deferred = Q.defer();

            $.ajax({
                url: url,
                type: type,
                data: data ? JSON.stringify(data) : "",
                contentType: "application/json",
                headers: headers,
                timeout: timeout || 5000,
                success: function (resultData) {
                    deferred.resolve(resultData);
                },
                error: function (errorData) {
                    deferred.reject(errorData);
                }
            });

            return deferred.promise;
        };

        return {
            getJSON: function (url) {
                return makeHttpRequest(url, "GET");
            },
            postJSON: function (url, data) {
                return makeHttpRequest(url, "POST", data);
            },
            addParams: function addParams(key, value, requestUrl) {
                var isFirstParam = (requestUrl.indexOf('?') === -1);
                return (requestUrl + (isFirstParam ? '?' + key + '=' + value : '&' + key + '=' + value));
            }
        };
    }());
}($, Q, fueloChromeApp));