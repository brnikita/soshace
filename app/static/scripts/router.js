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
    debugger;
    return Backbone.Router.extend({

        initialize: function(){
            debugger;
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
            debugger;
        }
    });
});