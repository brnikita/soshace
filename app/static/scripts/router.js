'use strict';

/**
 * Модуль страницы просмотра поста
 *
 * @module Router
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'modules/headerView',
    'modules/posts/postsList/postsListView',
    'modules/posts/postDetail/postDetailView',
    'modules/posts/addPost/addPostView',
    'modules/auth/registration/registrationView',
    'modules/auth/authView',
    'modules/user/userView'
], function ($, _, Backbone, HeaderView, PostsListView, PostDetailView, AddPostView, AuthView, UserView) {
    return Backbone.Router.extend({

        /**
         * Сссылка на app.js
         *
         * @field
         * @name Router#app
         * @type {Object}
         */
        app: null,

        /**
         * @constructor
         * @name Router#initialize
         * @returns {undefined}
         */
        initialize: function (params) {
            this.app = params.app;
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
            ':locale/auth': 'redirectToLoginPage',
            ':locale/auth/login': 'loginPage',
            ':locale/auth/registration': 'registrationPage',
            ':locale/user/:id': 'userPage'
        },

        /**
         * Метод обработки роута страницы статей (главная)
         *
         * @method
         * @name Router#postsPage
         * @param {string} locale локаль
         * @returns {undefined}
         */
        postsPage: function (locale) {
            if (Soshace.firstLoad) {
                Soshace.firstLoad = false;
                return;
            }
            this.app.headerView.changeTab('isPostsPage');
            new PostsListView({
                app: this.app,
                locale: locale
            });
        },

        /**
         * Метод обработки роута страницы просмотра статьи
         *
         * @method
         * @name Router#postPage
         * @param {string} locale локаль
         * @param {string} year год
         * @param {string} month месяц
         * @param {string} date день
         * @param {string} title заголовок из урла
         * @returns {undefined}
         */
        postPage: function (locale, year, month, date, title) {
            if (Soshace.firstLoad) {
                Soshace.firstLoad = false;
                return;
            }
            this.app.headerView.changeTab();
            new PostDetailView({
                app: this.app,
                locale: locale,
                year: year,
                month: month,
                date: date,
                title: title
            });
        },

        /**
         * Метод обработки роута страницы добавления статьи
         *
         * @method
         * @name Router#addPostPage
         * @param {string} locale локаль
         * @returns {undefined}
         */
        addPostPage: function (locale) {
            this.app.headerView.changeTab('isAddPostPage');
            Soshace.firstLoad = false;
            new AddPostView({
                app: this.app,
                locale: locale
            });
        },

        /**
         * Метод обработки роута страницы логина
         *
         * @method
         * @name Router#loginPage
         * @param {string} locale локаль
         * @returns {undefined}
         */
        loginPage: function (locale) {
            new LoginView({
                app: this.app,
                locale: locale
            });
        },

        /**
         * Метод обработки роута страницы добавления статьи
         *
         * @method
         * @name Router#registrationPage
         * @param {string} locale локаль
         * @returns {undefined}
         */
        registrationPage: function (locale) {
            new RegistrationView({
                app: this.app,
                locale: locale
            });
        },

        /**
         * Метод делает редирект на страницу логина
         *
         * @method
         * @name Router#redirectToLoginPage
         * @param {string} locale локаль
         * @returns {undefined}
         */
        redirectToLoginPage: function (locale) {
            Backbone.history.navigate('/' + locale + '/auth/login/', {trigger: true});
        },

        /**
         * @method
         * @name Router#userPage
         * @param {string} locale локаль
         * @param {string} userId id пользователя
         * @returns {undefined}
         */
        userPage: function (locale, userId) {
            new UserView({
                app: this.app,
                locale: locale,
                userId: userId
            });
        }
    });
});