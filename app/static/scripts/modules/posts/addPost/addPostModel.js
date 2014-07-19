'use strict';

/**
 * Модель страницы добавления статьи
 *
 * @class AddPostModel
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'backbone.validation'
], function ($, _, Backbone) {
    return Backbone.Model.extend({
        /**
         * @property
         * @name AddPostModel.defaults
         * @type {Object}
         */
        defaults: {
            locale: null,
            postTitle: null,
            postBody: null
        },

        /**
         * @field
         * @name AddPostModel.defaults
         * @type {Object}
         */
        validation: {
            postTitle: {
                required: true
            },
            postBody: {
                required: true
            }
        },

        /**
         * @constructor
         * @name AddPostModel.initialize
         * @returns {undefined}
         */
        initialize: function () {
        }
    });
});