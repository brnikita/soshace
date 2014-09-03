'use strict';

/**
 * Вид страницы профиля пользователя
 *
 * @class UsersProfileView
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
         * @name UsersProfileView#model
         * @type {Backbone.Model | null}
         */
        model: null,

        /**
         * Ссылки на DOM элементы
         *
         * @field
         * @name UsersProfileView#elements
         * @type {Object}
         */
        elements: {
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name UsersProfileView#elements
         * @type {string}
         */
        template: Soshace.hbs.user,

        /**
         * @constructor
         * @name UsersProfileView#initialize
         * @returns {undefined}
         */
        initialize: function () {
        },

        /**
         * @method
         * @name UsersProfileView#serialize
         * @returns {Object}
         */
        serialize: function () {
        },

        /**
         * Метод сохраняет DOM элементы
         *
         * @method
         * @name UsersProfileView#setElements
         * @returns {undefined}
         */
        setElements: function () {
        },

        /**
         * Метод запускается, когда рендеринг шаблона происходит на сервере
         *
         * @method
         * @name UsersProfileView#withoutRender
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
         * @name UsersProfileView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
            this.setElements();
        }
    });
});