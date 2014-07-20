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
        },

        /**
         * Метод получает статью
         *
         * @method
         * @name PostDetailModel.initialize
         * @param {Array} routeParams параметры зароса
         * @returns {undefined}
         */
        getPost: function (routeParams) {
            this.fetch({data: {
                locale: routeParams[0],
                year: routeParams[1],
                month: routeParams[2],
                date: routeParams[3],
                title: routeParams[4]
            }}, {silent: true}).
                done(_.bind(function () {
                    this.trigger('postReceived');
                }, this));
        }
    });
});