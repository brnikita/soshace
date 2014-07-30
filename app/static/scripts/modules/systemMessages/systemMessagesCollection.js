'use strict';

/**
 * Коллекция системных сообщений
 *
 * @class SystemMessagesCollection
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'utils/helpers'
], function ($, _, Backbone, SystemMessagesModel) {
    return Backbone.Collection.extend({
        /**
         * @field
         * @name SystemMessagesCollection#model
         * @type {SystemMessagesModel}
         */
        model: SystemMessagesModel,

        /**
         * @field
         * @name SystemMessagesCollection#url
         * @type {String}
         */
        url: Soshace.api.systemMessages,

        /**
         * @constructor
         * @name SystemMessagesCollection#initialize
         * @returns {undefined}
         */
        initialize: function () {
        }
    });
});