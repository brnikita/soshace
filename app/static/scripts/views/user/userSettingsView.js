'use strict';

/**
 * Вид страницы настроек пользователя
 *
 * @class UserSettingsView
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'backbone.layoutmanager',
    'templates'
], function ($, _, Backbone) {
    return Backbone.Layout.extend({
        /**
         * Модель деталей статьи
         *
         * @field
         * @name UserSettingsView#model
         * @type {Backbone.Model | null}
         */
        model: null,

        /**
         * Ссылки на DOM элементы
         *
         * @field
         * @name UserSettingsView#elements
         * @type {Object}
         */
        elements: {
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name UserSettingsView#elements
         * @type {string}
         */
        template: Soshace.hbs.user,

        /**
         * @constructor
         * @name UserSettingsView#initialize
         * @returns {undefined}
         */
        initialize: function () {
        },

        /**
         * @method
         * @name UserSettingsView#serialize
         * @returns {Object}
         */
        serialize: function () {
        },

        /**
         * Метод сохраняет DOM элементы
         *
         * @method
         * @name UserSettingsView#setElements
         * @returns {undefined}
         */
        setElements: function () {
        },

        /**
         * Метод запускается, когда рендеринг шаблона происходит на сервере
         *
         * @method
         * @name UserSettingsView#withoutRender
         * @param {jQuery} $el корневой элемент
         * @returns {undefined}
         */
        withoutRender: function($el){
            this.$el = $el;
            this.delegateEvents();
            this.setElements();
        },

        /**
         * @method
         * @name UserSettingsView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
            this.setElements();
        }
    });
});