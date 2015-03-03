if (!fueloChromeApp) {
    fueloChromeApp = {};
}

fueloChromeApp.httpRequester = (function () {
    var makeHttpRequest = function (url, type, data, timeout) {
        var deferred = Q.defer();
        $.ajax({
            url: url,
            type: type,
            data: data ? JSON.stringify(data) : "",
            contentType: "application/json",
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

    function addParams(key, value, requestUrl) {
        var isFirstParam = requestUrl.indexOf('?') === -1;
        return requestUrl + isFirstParam ? '?' + key + '=' + value : '&' + key + '=' + value;
    }


    var getJSON = function (url) {
        return makeHttpRequest(url, "GET");
    };

    var postJSON = function (url, data) {
        return makeHttpRequest(url, "POST", data);
    };

    var putJSONWithCustomHeaders = function (url, data, headersKey, headersValue) {
        var deferred = Q.defer();
        $.ajax({
            url: url,
            type: 'GET',
            headers: {'X-SessionKey': headersValue},
            contentType: "application/json",
            timeout: 5000,
            data: {_method: 'put'},
            success: function (resultData) {
                deferred.resolve(resultData);
            },
            error: function (errorData) {
                deferred.reject(errorData);
            }
        });
        return deferred.promise;
    };

    var postJSONWithCustomHeaders = function (url, data, headersKey, headersValue) {
        var deferred = Q.defer();
        $.ajax({
            url: url,
            type: 'POST',
            data: data ? JSON.stringify(data) : "",
            headers: {'X-SessionKey': headersValue},
            contentType: "application/json",
            timeout: 5000,
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
        getJSON: getJSON,
        postJSON: postJSON,
        putJSONWithCustomHeaders: putJSONWithCustomHeaders,
        postJSONWithCustomHeaders: postJSONWithCustomHeaders,
        addParams: addParams
    }
}());