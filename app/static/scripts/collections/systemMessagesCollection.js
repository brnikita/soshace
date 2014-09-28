'use strict';
(function (Soshace) {
    /**
     * Коллекция системных сообщений
     *
     * @class Soshace.collections.SystemMessagesCollection
     */
    Soshace.collections.SystemMessagesCollection = Soshace.core.Collection.extend({
        /**
         * @field
         * @name Soshace.collections.SystemMessagesCollection#model
         * @type {Function}
         */
        model: Soshace.models.SystemMessagesModel,

        /**
         * @method
         * @name Soshace.collections.SystemMessagesCollection#parse
         * @returns {undefined}
         */
        parse: function (response) {
            return response.results;
        },

        /**
         * @field
         * @name Soshace.collections.SystemMessagesCollection#url
         * @type {string}
         */
        url: Soshace.urls.api.systemMessages,

        /**
         * @constructor
         * @name Soshace.collections.SystemMessagesCollection#initialize
         * @returns {undefined}
         */
        initialize: function () {
        }
    });
})(window.Soshace);