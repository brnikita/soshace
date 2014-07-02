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
    'modules/registration/registrationView',
    'modules/finishRegistration/finishRegistrationView',
    'modules/login/loginView',
    'modules/user/userView'
], function ($, _, Backbone, HeaderView, PostsListView, PostDetailView, AddPostView, RegistrationView, FinishRegistrationView, LoginView, UserView) {
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
         * Список видов
         *
         * @field
         * @name Router#views
         * @type {Object}
         */
        views: {
            postDetailView: null,
            loginView: null,
            registrationView: null,
            postsListView: null,
            addPostView: null,
            finishRegistrationView: null,
            userView: null
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
            ':locale/login': 'loginPage',
            ':locale/registration': 'registrationPage',
            ':locale/user/:username': 'userPage',
            ':locale/registration/confirm_email': 'finishRegistrationView'
        },

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
         * Метод удаляет слушатели предыдущих видов
         *
         * @method
         * @name Router#unbindPreviousView
         * @returns {undefined}
         */
        unbindPreviousView: function () {
            _.each(this.views, function (view) {
                if (view === null) {
                    return;
                }
                view.undelegateEvents();
                view.$el.removeData().unbind();

                if (typeof view.viewExitHandler === 'function') {
                    view.viewExitHandler();
                }
            });
        },

        /**
         * Метод обработки роута страницы статей (главная)
         *
         * @method
         * @name Router#postsPage
         * @param {String} locale локаль
         * @returns {undefined}
         */
        postsPage: function (locale) {
            if (Soshace.firstLoad) {
                Soshace.firstLoad = false;
                return;
            }
            this.unbindPreviousView();
            this.app.headerView.changeTab('isPostsPage');
            this.views.postsListView = new PostsListView({
                app: this.app,
                locale: locale
            });
        },

        /**
         * Метод обработки роута страницы просмотра статьи
         *
         * @method
         * @name Router#postPage
         * @param {String} locale локаль
         * @param {String} year год
         * @param {String} month месяц
         * @param {String} date день
         * @param {String} title заголовок из урла
         * @returns {undefined}
         */
        postPage: function (locale, year, month, date, title) {
            if (Soshace.firstLoad) {
                Soshace.firstLoad = false;
                return;
            }
            this.unbindPreviousView();
            this.app.headerView.changeTab();
            this.views.postDetailView = new PostDetailView({
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
         * @param {String} locale локаль
         * @returns {undefined}
         */
        addPostPage: function (locale) {
            this.unbindPreviousView();
            this.views.addPostView = new AddPostView({
                app: this.app,
                locale: locale
            });
        },

        /**
         * Метод обработки роута страницы логина
         *
         * @method
         * @name Router#loginPage
         * @param {String} locale локаль
         * @returns {undefined}
         */
        loginPage: function (locale) {
            this.unbindPreviousView();
            this.views.loginView = new LoginView({
                app: this.app,
                locale: locale
            });
        },

        /**
         * Метод обработки роута страницы добавления статьи
         *
         * @method
         * @name Router#registrationPage
         * @param {String} locale локаль
         * @returns {undefined}
         */
        registrationPage: function (locale) {
            this.unbindPreviousView();
            this.views.registrationView = new RegistrationView({
                app: this.app,
                locale: locale
            });
        },

        /**
         * Метод обработчик роута страницы завершения регитсрации
         *
         * @method
         * @name Router#finishRegistrationView
         * @param {String} locale
         * @returns {undefined}
         */
        finishRegistrationView: function (locale) {
            this.unbindPreviousView();
            this.views.finishRegistrationView = new FinishRegistrationView({
                app: this.app,
                locale: locale
            });
        },

        /**
         * @method
         * @name Router#userPage
         * @param {String} locale локаль
         * @param {String} userName
         * @returns {undefined}
         */
        userPage: function (locale, userName) {
            this.unbindPreviousView();
            this.views.userView = new UserView({
                app: this.app,
                locale: locale,
                userName: userName
            });
        }
    });
});