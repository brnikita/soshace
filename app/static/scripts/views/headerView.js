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
    'backbone.layoutmanager',
    'templates'
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
            isPostEditTab: false,
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
            postEdit: 'isPostEditTab',
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
            data.paths = Soshace.urls;
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