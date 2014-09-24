'use strict';

/**
 * Коллекция системных сообщений
 *
 * @class SystemMessagesCollection
 */

define([
    'core',
    'models/systemMessagesModel',
    'global'
], function (Core, SystemMessagesModel, Soshace) {
    return Core.Collection.extend({
        /**
         * @field
         * @name SystemMessagesCollection#model
         * @type {SystemMessagesModel}
         */
        model: SystemMessagesModel,

        /**
         * @method
         * @name SystemMessagesCollection#parse
         * @returns {undefined}
         */
        parse: function(response){
            return response.results;
        },

        /**
         * @field
         * @name SystemMessagesCollection#url
         * @type {string}
         */
        url: Soshace.urls.api.systemMessages,

        /**
         * @constructor
         * @name SystemMessagesCollection#initialize
         * @returns {undefined}
         */
        initialize: function () {
        }
    });
});