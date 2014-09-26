'use strict';

/**
 * Класс для работы с ajax запросами
 *
 * @module Ajax
 */
define(['underscore', './deferred'], function (_, Deferred) {
    return Deferred.extend({
        /**
         * @constructor
         * @param {string} requestType
         * @param {string} url
         * @param {Object} params параметры запроса
         * @return {undefined}
         */
        initialize: function (requestType, url, params) {
            var xmlHttp = new XMLHttpRequest();

            xmlHttp.onreadystatechange = _.bind(function () {
                var response, status;

                if (xmlHttp.readyState === 4) {
                    status = xmlHttp.status;
                    response =  JSON.parse(xmlHttp.responseText);

                    if (status === 200) {
                        this.resolve(response, status);
                    } else {
                        this.fail(response, status);
                    }
                }
            }, this);

            xmlHttp.open(requestType, url, true);
            xmlHttp.send(params);
        }
    });
});