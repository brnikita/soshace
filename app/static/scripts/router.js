'use strict';

/**
 * Модуль страницы просмотра поста
 *
 * @module Router
 */
define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    return Backbone.Router.extend({

        initialize: function(){
        },

        /**
         * @property
         * @name Router#routes
         * @type {Object}
         */
        routes: {
            'ru': 'posts'
        },

        /**
         * @method
         * @name Router#posts
         * @returns {undefined}
         */
        posts: function () {
        }
    });
});