'use strict';

/**
 * Вид страницы редактирования пользователя
 *
 * @class UserEditView
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
         * @name UserEditView#model
         * @type {Backbone.Model | null}
         */
        model: null,

        /**
         * Ссылки на DOM элементы
         *
         * @field
         * @name UserEditView#elements
         * @type {Object}
         */
        elements: {
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name UserEditView#elements
         * @type {string}
         */
        template: Soshace.hbs.user,

        /**
         * @constructor
         * @name UserEditView#initialize
         * @returns {undefined}
         */
        initialize: function () {
        },

        /**
         * @method
         * @name UserEditView#serialize
         * @returns {Object}
         */
        serialize: function () {
        },

        /**
         * Метод сохраняет DOM элементы
         *
         * @method
         * @name UserEditView#setElements
         * @returns {undefined}
         */
        setElements: function () {
        },

        /**
         * Метод запускается, когда рендеринг шаблона происходит на сервере
         *
         * @method
         * @name UserEditView#withoutRender
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
         * @name UserEditView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
            this.setElements();
        }
    });
});