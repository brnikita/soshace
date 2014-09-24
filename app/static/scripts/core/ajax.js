'use strict';

/**
 * Класс для работы с ajax запросами
 *
 * @module Ajax
 */
define(['./class', './deferred'], function (Class, Deferred) {
    return Class.extend({

        deferred: null,

        /**
         * @constructor
         * @param {string} requestType
         * @param {string} url
         * @param {Object} params параметры запроса
         * @return {Deferred}
         */
        initialize: function (requestType, url, params) {
            var deferred = new Deferred(),
                xmlHttp = new XMLHttpRequest();

            xmlHttp.onreadystatechange = function () {
                var status;

                if (xmlHttp.readyState === 4) {
                    status = xmlHttp.status;

                    if (status === 200) {
                        deferred.resolve({
                            response: xmlHttp.responseText,
                            status: status
                        });
                    } else {
                        deferred.fail({
                            response: xmlHttp.responseText,
                            status: status
                        });
                    }
                }
            };

            xmlHttp.open(requestType, url, true);
            xmlHttp.send();

            return deferred;
        }
    });
});