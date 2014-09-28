'use strict';
(function (Soshace) {
    var _ = Soshace._;

    /**
     * Класс для работы с ajax запросами
     *
     * @class Soshace.core.Ajax
     */
    Soshace.core.Ajax = Soshace.core.Deferred.extend({
        /**
         * @constructor
         * @name Soshace.core.Ajax#initialize
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
                    response = JSON.parse(xmlHttp.responseText);

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
})(window.Soshace);