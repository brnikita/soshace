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

        /**
         * @constructor
         * @name Router#initialize
         * @returns {undefined}
         */
        initialize: function () {
            Backbone.history.start({
                pushState: true
            });
        },

        /**
         * @property
         * @name Router#routes
         * @type {Object}
         */
        routes: {
            ':locale': 'postsPage',
            ':locale/posts/:year/:month/:date/:title': 'postPage',
            ':locale/add_post': 'addPostPage',
            ':locale/registration': 'registrationPage',
            ':locale/login': 'loginPage'
        },

        /**
         * Метод обработки роута страницы статей (главная)
         *
         * @method
         * @name Router#postsPage
         * @returns {undefined}
         */
        postsPage: function (locale) {
            debugger;
        },

        /**
         * Метод обработки роута страницы просмотра статьи
         *
         * @method
         * @name Router#postPage
         * @returns {undefined}
         */
        postPage: function (locale, year, month, date, title) {
            debugger;
        },

        /**
         * Метод обработки роута страницы добавления статьи
         *
         * @method
         * @name Router#addPostPage
         * @returns {undefined}
         */
        addPostPage: function () {
            debugger;
        },

        /**
         * Метод обработки роута страницы логина
         *
         * @method
         * @name Router#loginPage
         * @returns {undefined}
         */
        loginPage: function () {
            debugger;
        },

        /**
         * Метод обработки роута страницы добавления статьи
         *
         * @method
         * @name Router#registrationPage
         * @returns {undefined}
         */
        registrationPage: function () {
            debugger;
        }
    });
});