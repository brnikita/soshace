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
    'backbone.layoutmanager'
], function ($, _, Backbone, Helpers) {
    return Backbone.Layout.extend({

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
            isSignUpPage: false,
            isSignInPage: false
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
         * @returns {undefined}
         */
        initialize: function () {
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
         * @method
         * @name HeaderView.serialize
         * @returns {Object}
         */
        serialize: function () {
            var params = {};
            params = _.extend(params, this.tabsConfig);
            params.locale = Helpers.getLocale();
            return params;
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