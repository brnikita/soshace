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
    'utils/helpers',
    './registrationModel',
    'backbone.layoutmanager'
], function ($, _, Backbone, Widgets, Helpers, RegistrationModel) {
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
            //Поля, которые сохряняем в базу
            validateInput: null
        },

        /**
         * @method
         * @name RegistrationView.events
         * @type {Object}
         */
        events: {
            'click .js-sign-up': 'submitForm',
            'keyup .js-model-field': 'saveFieldToModel'
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name RegistrationView.elements
         * @type {string}
         */
        template: 'registrationView',

        /**
         * @constructor
         * @name RegistrationView.initialize
         * @param {Object} params
         * @returns {undefined}
         */
        initialize: function (params) {
            _.bindAll(this, 'saveFormData', 'saveSuccess', 'saveFailed');
            Widgets.setBodyClass('bg-symbols bg-color-yellow');
            this.model = new RegistrationModel();
            this.app = params.app;
            if (Soshace.firstLoad) {
                Soshace.firstLoad = false;
                return;
            }
            this.render();
        },

        /**
         * Метод сохраняет значения полей в модель
         *
         * @method
         * @name RegistrationView.saveFieldToModel
         * @param {jQuery.Event} event
         * @returns {undefined}
         */
        saveFieldToModel: function (event) {
            var params = {},
                $field = $(event.target),
                fieldValue = $field.val(),
                fieldName = $field.attr('name');

            params[fieldName] = fieldValue;
            this.model.set(params, {silent: true});
        },

        /**
         * Метод обработчик отправки формы
         *
         * @method
         * @name RegistrationView.submitForm
         * @returns {undefined}
         */
        submitForm: function () {
            this.saveFormData(true);
        },

        /**
         * Метод сохраняет данные формы в содель
         *
         * @method
         * @name RegistrationView.saveFormData
         * @returns {undefined}
         */
        saveFormData: function () {
            var _this = this;

            this.model.save(null, {
                success: _this.saveSuccess,
                error: _this.saveFailed
            });
            event.preventDefault();
        },

        /**
         * Метод обработчик успешной регистрации пользователя
         *
         * @method
         * @name RegistrationView.saveSuccess
         * @returns {undefined}
         */
        saveSuccess: function () {
            var locale = Helpers.getLocale(),
                link = '/' + locale + '/add_post';
            Backbone.history.navigate(link, {trigger: true});
        },

        /**
         * Метод обработчик неудачной реги
         *
         * @method
         * @name RegistrationView.saveFailed
         * @returns {undefined}
         */
        saveFailed: function () {

        },

        /**
         * @method
         * @name RegistrationView.serialize
         * @returns {Object}
         */
        serialize: function () {
        },

        /**
         * Метод сохряняет ссылки на DOM элементы
         *
         * @method
         * @name RegistrationView.setElements
         * @returns {undefined}
         */
        setElements: function () {
            this.elements.validateInput = this.$('.js-validate-input');
        },

        /**
         * @method
         * @name RegistrationView.afterRender
         * @returns {undefined}
         */
        afterRender: function () {
            this.setElements();
        }
    });
});