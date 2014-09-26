'use strict';

/**
 * Ядро приложения
 *
 * Содержит основные классы для создания MVC приложения
 *
 * API классов моделей, видов, коллекций схоже с API Backbone
 *
 * @module Core
 */

define([
    'underscore',
    'core/class',
    'core/event',
    'core/deferred',
    'core/ajax',
    'core/dom',
    'core/model',
    'core/validation',
    'core/view',
    'core/collection',
    'core/controller',
    'core/history',
    'core/router'
], function (_, Class, Event, Deferred, Ajax, Dom, Model, Validation, View, Collection, Controller, History, Router) {
    var Global = window.Soshace,
        Core = {
            /**
             * Базовый класс
             *
             * @public
             * @field
             * @name Soshace.Core.Class
             * @type {Function}
             */
            Class: Class,

            /**
             * Класс событий
             *
             * @public
             * @field
             * @name Soshace.Core.Event
             * @type {Function}
             */
            Event: Event,

            /**
             * @public
             * @field
             * @name Soshace.Core.Deferred
             * @type {Function}
             */
            Deferred: Deferred,

            /**
             * Класс для работы с ajax запросами
             *
             * @public
             * @field
             * @name Soshace.Core.Ajax
             * @type {Function}
             */
            Ajax: Ajax,

            /**
             * Класс для работы с DOM
             *
             * @public
             * @field
             * @name Soshace.Core.Dom
             * @type {Function}
             */
            Dom: Dom,

            /**
             * @public
             * @field
             * @name Soshace.Core.Ajax
             * @type {Function}
             */
            Model: Model,

            /**
             * @public
             * @field
             * @name Soshace.Core.Validation
             * @type {Function}
             */
            Validation: Validation,

            /**
             * @public
             * @field
             * @name Soshace.Core.View
             * @type {Function}
             */
            View: View,

            /**
             * @public
             * @field
             * @name Soshace.Core.Collection
             * @type {Function}
             */
            Collection: Collection,

            /**
             * @public
             * @field
             * @name Soshace.Core.Controller
             * @type {Function}
             */
            Controller: Controller,

            /**
             * Класс для работы с History Api
             *
             * @public
             * @field
             * @name Soshace.Core.History
             * @type {Function}
             */
            History: History,

            /**
             * @public
             * @field
             * @name Soshace.Core.Router
             * @type {Function}
             */
            Router: Router,

            /**
             * Метод возвращает Ajax ообъект
             *
             * @public
             * @method
             * @name Soshace.Core.ajax
             * @param {string} requestType
             * @param {string} url
             * @param {Object} [params] параметры запроса
             * @returns {Ajax}
             */
            ajax: function(requestType, url, params){
                return new Ajax(requestType, url, params);
            },

            /**
             * Метод возвращает Ajax ообъект
             * Метод делает GET запрос
             *
             * @public
             * @method
             * @name Soshace.Core.get
             * @param {string} url
             * @param {Object} [params] параметры запроса
             * @returns {Ajax}
             */
            get: function(url, params){
                return new Ajax('GET', url, params);
            },

            /**
             * Метод возвращает Ajax ообъект
             * Метод делает POST запрос
             *
             * @public
             * @method
             * @name Soshace.Core.post
             * @param {string} url
             * @param {Object} [params] параметры запроса
             * @returns {Ajax}
             */
            post: function(url, params){
                return new Ajax('POST', url, params);
            },

            /**
             * Метод возвращает Dom объект
             *
             * @public
             * @method
             * @name Soshace.Core.$
             * @param {string | HTMLElement} element имя селесектора или ссылка на сам елемент
             * @returns {Dom}
             */
            $: function(element){
                return new Dom(element);
            },

            /**
             * Метод возвращает деферред объект
             *
             * @public
             * @method
             * @name Soshace.Core.deferred
             * @returns {Deferred}
             */
            deferred: function(){
                return new Deferred();
            }
        };

    if (_.isUndefined(Global)) {
        Global = window.Soshace = {};
    }

    if (_.isUndefined(Global.Core)) {
        Global.Core = Core;
    }

    return Core;
});