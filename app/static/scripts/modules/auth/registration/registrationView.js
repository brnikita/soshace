'use strict';

/**
 * Вид страницы регистрации
 *
 * @module RegistrationView
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'utils/widgets',
    './registrationModel',
    'backbone.layoutmanager'
], function ($, _, Backbone, Widgets, RegistrationModel) {
    return Backbone.Layout.extend({

        /**
         * Ссылка на объект App
         *
         * @field
         * @name RegistrationView.app
         * @type {Object}
         */
        app: null,

        /**
         * Класс родительского элемента, к которому
         * будет прикреплен вид
         *
         * @field
         * @name RegistrationView.el
         * @type {string}
         */
        el: '.js-content',

        /**
         * Модель деталей статьи
         *
         * @field
         * @name RegistrationView.model
         * @type {Backbone.Model | null}
         */
        model: null,

        /**
         * @field
         * @name RegistrationView.elements
         * @type {Object}
         */
        elements: {
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name RegistrationView.template
         * @type {string}
         */
        template: 'authView',

        /**
         * @constructor
         * @name RegistrationView.initialize
         * @param {Object} params
         * @returns {undefined}
         */
        initialize: function (params) {
            Widgets.setBodyClass('bg-symbols bg-color-yellow');
            this.app = params.app;
            this.model = new RegistrationModel({
                locale: params.locale
            });
            if (Soshace.firstLoad) {
                Soshace.firstLoad = false;
            } else {
                this.app.headerView.changeTab('isAuthPage');
                this.render();
            }
        },

        /**
         * @method
         * @name RegistrationView.serialize
         * @returns {Object}
         */
        serialize: function () {
            var data = this.model.toJSON();
            data.isRegistrationTab = true;
            return data;
        },

        /**
         * @method
         * @name RegistrationView.afterRender
         * @returns {undefined}
         */
        afterRender: function () {
        }
    });
});