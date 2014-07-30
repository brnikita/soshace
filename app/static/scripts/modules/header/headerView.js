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
    'jquery.cookie',
    'backbone.layoutmanager'
], function ($, _, Backbone, Helpers) {
    return Backbone.Layout.extend({
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
            isAddPostTab: false,
            isAuthTab: false,
            isUserTab: false
        },

        /**
         * Соотношение алиаса страницы и названия таба
         *
         * @field
         * @name HeaderView.pageAliasToTab
         * @type {Object}
         */
        pageAliasToTab: {
            login: 'isAuthTab',
            registration: 'isAuthTab',
            addPost: 'isAddPostTab',
            user: 'isUserTab'
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
        template: Soshace.hbs['partials/header'],

        /**
         * @constructor
         * @name HeaderView.initialize
         * @returns {undefined}
         */
        initialize: function () {
        },

        /**
         * Метод смены таба
         *
         * @method
         * @name HeaderView.changeTab
         * @param {string} [pageAlias] алиас страницы
         * @returns {undefined}
         */
        changeTab: function (pageAlias) {
            var tabName = pageAlias && this.pageAliasToTab[pageAlias],
                tabConfig = this.tabsConfig;

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
            var app = Soshace.app,
                data = {};
            
            data = _.extend(data, this.tabsConfig);
            data.locale = Helpers.getLocale();
            data.isAuthenticated = app.isAuthenticated();
            data.paths = Soshace.paths;
            if (data.isAuthenticated) {
                data.profileUserName = Soshace.profile.userName;
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