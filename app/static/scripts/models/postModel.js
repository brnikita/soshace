'use strict';

/**
 * Модель статьи
 *
 * @class PostModel
 */

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    return Backbone.Model.extend({

        /**
         * @field
         * @name PostModel#default
         * @type {String | null}
         */
        default: {
            _id: null,
            locale: null,
            //Загловок поста
            title: null,
            //Категория, используется в урлах
            category: null,
            //Тело поста
            body: null
        },

        /**
         * @method
         * @name PostModel#url
         * @returns {string}
         */
        url: function () {
            var url = Soshace.urls.api.post,
                _id = this.get('_id');

            return url.replace('0', _id);
        },

        /**
         * @constructor
         * @name PostModel#initialize
         * @returns {undefined}
         */
        initialize: function () {
        },

        /**
         * Метод получает статью
         *
         * @method
         * @name PostModel#initialize
         * @param {Array} routeParams параметры зароса
         * @returns {jQuery.Deferred}
         */
        getPost: function (routeParams) {
            this.set('_id', routeParams[1]);
            return this.fetch();
        }
    });
});