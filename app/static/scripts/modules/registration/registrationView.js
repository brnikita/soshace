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
         * @name RegistrationView#app
         * @type {Object}
         */
        app: null,

        /**
         * Класс родительского элемента, к которому
         * будет прикреплен вид
         *
         * @field
         * @name RegistrationView#el
         * @type {string}
         */
        el: '.js-tab-content',

        /**
         * Модель формы регистрации
         *
         * @field
         * @name RegistrationView#model
         * @type {Backbone.Model | null}
         */
        model: null,

        /**
         * @field
         * @name RegistrationView#elements
         * @type {Object}
         */
        elements: {
        },

        /**
         * Список обработчиков событий
         *
         * @field
         * @name RegistrationView#events
         * @type {Object}
         */
        events: {
            'keyup .js-model-field': 'changeFormFieldHandler'
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name RegistrationView#template
         * @type {string}
         */
        template: 'authView',

        /**
         * @constructor
         * @name RegistrationView#initialize
         * @param {Object} params
         * @returns {undefined}
         */
        initialize: function (params) {
            _.bindAll(this, 'render');
            Widgets.setBodyClass('bg-symbols bg-color-yellow');
            this.app = params.app;
            this.model = new RegistrationModel({
                locale: params.locale
            });
            if (Soshace.firstLoad) {
                this.firstLoadHandler();
            } else {
                this.secondLoadHandler();
            }
        },

        /**
         * Метод исполняется, если страница была отрендерена на серевере
         *
         * @method
         * @name RegistrationView#firstLoadHandler
         * @returns {undefined}
         */
        firstLoadHandler: function () {
            Soshace.firstLoad = false;
            this.afterRender();
        },

        /**
         * Метод исполняется при клиентском рендере страницы
         *
         * @method
         * @name RegistrationView#secondLoadHandler
         * @returns {undefined}
         */
        secondLoadHandler: function () {
            this.fetchPartial('registrationView').done(this.render);
            this.app.headerView.changeTab('isAuthPage');
        },

        /**
         * Метод обработчик события изменения поля формы
         *
         * @method
         * @name RegistrationView#changeFormFieldHandler
         * @param {jQuery.Event} event
         * @returns {undefined}
         */
        changeFormFieldHandler: function (event) {

        },

        /**
         * @method
         * @name RegistrationView#serialize
         * @returns {Object}
         */
        serialize: function () {
            var data = this.model.toJSON();
            data.isRegistrationTab = true;
            return data;
        },

        /**
         * @method
         * @name RegistrationView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
        }
    });
});