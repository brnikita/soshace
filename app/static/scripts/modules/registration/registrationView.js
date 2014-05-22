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
            //Поля, которые сохряняем в базу
            validateInput: null
        },

        /**
         * @method
         * @name RegistrationView.events
         * @type {Object}
         */
        events: {
            'click .js-sign-up': 'submitForm'
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
            Widgets.setBodyClass('bg-books');
            this.app = params.app;
            this.render();
        },

        /**
         * @method
         * @name RegistrationView.getFormData
         * @returns {Object}
         */
        getFormData: function(){

        },

        /**
         * @method
         * @name RegistrationView.validateForm
         * @returns
         */
        validateForm: function(){

        },

        /**
         * @method
         * @name RegistrationView.submitForm
         * @param {jQuery.Event} event
         * @returns {undefined}
         */
        submitForm: function(event){
            this.validateForm();
            event.preventDefault();
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
        setElements: function(){
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