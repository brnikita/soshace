'use strict';

/**
 * Модель страницы просмотра статьи
 *
 * @module RegistrationModel
 */

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    return Backbone.Model.extend({

        /**
         * @method
         * @name RegistrationModel.initialize
         * @returns {string}
         */
        url: Soshace.urls.api.saveUser,

        /**
         * @constructor
         * @name RegistrationModel.initialize
         * @returns {undefined}
         */
        initialize: function () {
        }
    });
});