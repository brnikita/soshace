'use strict';

/**
 * Вид страницы регистрации
 *
 * @module FinishRegistrationView
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'utils/widgets',
    'backbone.layoutmanager'
], function ($, _, Backbone, Widgets) {
    return Backbone.Layout.extend({

        /**
         * Ссылка на объект App
         *
         * @field
         * @name FinishRegistrationView#app
         * @type {Object}
         */
        app: null,

        /**
         * Класс родительского элемента, к которому
         * будет прикреплен вид
         *
         * @field
         * @name FinishRegistrationView#el
         * @type {string}
         */
        el: '.js-content',

        /**
         * @field
         * @name FinishRegistrationView#elements
         * @type {Object}
         */
        elements: {
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name FinishRegistrationView#template
         * @type {string}
         */
        template: 'auth/registrationFinish',

        /**
         * @constructor
         * @name FinishRegistrationView#initialize
         * @param {Object} params
         * @returns {undefined}
         */
        initialize: function (params) {
            _.bindAll(this, 'render');
            Widgets.setBodyClass('bg-symbols bg-color-yellow');
            this.app = params.app;
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
         * @name FinishRegistrationView#firstLoadHandler
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
         * @name FinishRegistrationView#secondLoadHandler
         * @returns {undefined}
         */
        secondLoadHandler: function () {
            this.fetchPartial('registrationView').done(this.render);
            this.app.headerView.changeTab('isAuthPage');
        },

        /**
         * @method
         * @name FinishRegistrationView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
        }
    });
});