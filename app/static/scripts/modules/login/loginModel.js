'use strict';

/**
 * Модель страницы просмотра статьи
 *
 * @module LoginModel
 */

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    return Backbone.Model.extend({
        /**
         * @property
         * @name LoginModel.defaults
         * @type {Object}
         */
        defaults: {
            locale: null
        },

        /**
         * @constructor
         * @name LoginModel.initialize
         * @param {Object} params
         * @returns {undefined}
         */
        initialize: function (params) {
            this.set({locale: params.locale}, {silent: true});
        }
    });
});