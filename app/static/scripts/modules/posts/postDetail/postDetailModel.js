'use strict';

/**
 * Модель страницы просмотра статьи
 *
 * @module PostDetailModel
 */

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    return Backbone.Model.extend({

        /**
         * @method
         * @name PostDetailModel.initialize
         * @returns {string}
         */
        url: Soshace.urls.api.postDetails,

        /**
         * @constructor
         * @name PostDetailModel.initialize
         * @returns {undefined}
         */
        initialize: function () {
        }
    });
});