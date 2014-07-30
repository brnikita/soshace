'use strict';

/**
 * Модель страницы просмотра статьи
 *
 * @class PostDetailModel
 */

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    return Backbone.Model.extend({

        /**
         * @field
         * @name PostDetailModel.default
         * @type {String | null}
         */
        default: {
            _id: null
        },

        /**
         * @method
         * @name PostDetailModel.url
         * @returns {string}
         */
        url: function () {
            var url = Soshace.urls.api.post,
                _id = this.get('_id');

            return url.replace('0', _id);
        },

        /**
         * @constructor
         * @name PostDetailModel.initialize
         * @returns {undefined}
         */
        initialize: function () {
        },

        /**
         * Метод получает статью
         *
         * @method
         * @name PostDetailModel.initialize
         * @param {Array} routeParams параметры зароса
         * @returns {jQuery.Deferred}
         */
        getPost: function (routeParams) {
            this.set('_id', routeParams[1]);
            return this.fetch();
        }
    });
});