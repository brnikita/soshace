'use strict';

/**
 * Вид страницы списка постов
 *
 * @module HeaderView
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'utils/helpers',
    'backbone.layoutmanager',
    'jquery.cookie'
], function ($, _, Backbone, Helpers) {
    return Backbone.Layout.extend({

        /**
         * Ссылка на объект App
         *
         * @field
         * @name LoginView#app
         * @type {Object}
         */
        app: null,

        /**
         * Класс родительского элемента, к которому
         * будет прикреплен вид
         *
         * @field
         * @name HeaderView.el
         * @type {string}
         */
        el: '.js-header',

        /**
         * @field
         * @name HeaderView.elements
         * @type {Object}
         */
        elements: {
        },

        /**
         * @field
         * @name HeaderView.tabsConfig
         * @type {Object}
         */
        tabsConfig: {
            isPostsPage: false,
            isAddPostPage: false,
            isAuthPage: false,
            isUserPage: false
        },

        /**
         * Список обработчиков событий
         *
         * @field
         * @name HeaderView.events
         * @type {Object}
         */
        events: {
            'click .js-sign-out': 'signOut'
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name HeaderView.elements
         * @type {string}
         */
        template: 'partials/headerView',

        /**
         * @constructor
         * @name HeaderView.initialize
         * @param {Object} params
         * @returns {undefined}
         */
        initialize: function (params) {
            this.app = params.app;
        },

        /**
         * Метод смены таба
         *
         * @method
         * @name HeaderView.changeTab
         * @param {string} [tabName] имя таба
         * @returns {undefined}
         */
        changeTab: function (tabName) {
            var tabConfig = this.tabsConfig;

            _.each(tabConfig, function (value, tab) {
                tabConfig[tab] = false;
            });

            if (tabName && typeof tabConfig[tabName] !== 'undefined') {
                tabConfig[tabName] = true;
            }
            this.render();
        },

        /**
         * Метод обработчик влика на кнопке 'Выход'
         *
         * @method
         * @name HeaderView.signOut
         * @param {jQuery.Event} event
         * @returns {undefined}
         */
        signOut: function (event) {
            var locale = Helpers.getLocale();

            event.preventDefault();
            $.get(Soshace.urls.api.logout).done(function () {
                Soshace.profile = null;
                Backbone.history.navigate('/' + locale, {trigger: true});
            });
        },

        /**
         * @method
         * @name HeaderView.serialize
         * @returns {Object}
         */
        serialize: function () {
            var data = {};
            data = _.extend(data, this.tabsConfig);
            data.locale = Helpers.getLocale();
            data.isAuthenticated = this.app.isAuthenticated();
            if (data.isAuthenticated) {
                data.userName = Soshace.profile.userName;
            }
            return data;
        },

        /**
         * @method
         * @name HeaderView.afterRender
         * @returns {undefined}
         */
        afterRender: function () {
        }
    });
});