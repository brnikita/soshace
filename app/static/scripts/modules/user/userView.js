'use strict';

/**
 * Вид страницы пользователя
 *
 * @module UserView
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'utils/widgets',
    './userModel',
    'backbone.layoutmanager'
], function ($, _, Backbone, Widgets, UserModel) {
    return Backbone.Layout.extend({

        /**
         * Ссылка на объект App
         *
         * @field
         * @name UserView.app
         * @type {Object}
         */
        app: null,

        /**
         * Класс родительского элемента, к которому
         * будет прикреплен вид
         *
         * @field
         * @name UserView.el
         * @type {string}
         */
        el: '.js-content',

        /**
         * Модель деталей статьи
         *
         * @field
         * @name UserView.model
         * @type {Backbone.Model | null}
         */
        model: null,

        /**
         * @field
         * @name UserView.elements
         * @type {Object}
         */
        elements: {
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name UserView.elements
         * @type {string}
         */
        template: 'userView',

        /**
         * @constructor
         * @name UserView.initialize
         * @param {Object} params
         * @returns {undefined}
         */
        initialize: function (params) {
            Widgets.setBodyClass('bg-symbols bg-color-blue');
            this.app = params.app;
            if (Soshace.firstLoad) {
                Soshace.firstLoad = false;
            } else {
                this.app.headerView.changeTab('isUserPage');
                this.render();
            }
        },

        /**
         * @method
         * @name UserView.serialize
         * @returns {Object}
         */
        serialize: function () {
            var data = {};

            data.isAutentificated = this.app.isAuthenticated();
            return data;
        },

        /**
         * @method
         * @name UserView.afterRender
         * @returns {undefined}
         */
        afterRender: function () {
        }
    });
});