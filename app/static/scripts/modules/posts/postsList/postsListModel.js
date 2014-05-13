'use strict';

/**
 * Модель списка статей
 *
 * @module PostsListModel
 */

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    return Backbone.Model.extend({

        /**
         * @method
         * @name PostsListModel.initialize
         * @returns {string}
         */
        url: Soshace.urls.api.posts,

        /**
         * @constructor
         * @name PostsListModel.initialize
         * @returns {undefined}
         */
        initialize: function () {
        }
    });
});