'use strict';

/**
 * Ядро приложения
 *
 * Содержит основные классы для создания MVC приложения
 *
 * API классов моделей, видов, коллекций схоже с API Backbone
 *
 * @module Soshace.core
 */

Soshace.core = {
    /**
     * Базовый класс
     *
     * @public
     * @field
     * @name Soshace.Core.Class
     * @type {Function | null}
     */
    Class: null,

    /**
     * Класс событий
     *
     * @public
     * @field
     * @name Soshace.Core.Event
     * @type {Function | null}
     */
    Event: null,

    /**
     * @public
     * @field
     * @name Soshace.Core.Deferred
     * @type {Function | null}
     */
    Deferred: null,

    /**
     * Класс для работы с ajax запросами
     *
     * @public
     * @field
     * @name Soshace.Core.Ajax
     * @type {Function | null}
     */
    Ajax: null,

    /**
     * Класс для работы с DOM
     *
     * @public
     * @field
     * @name Soshace.Core.Dom
     * @type {Function | null}
     */
    Dom: null,

    /**
     * @public
     * @field
     * @name Soshace.Core.Ajax
     * @type {Function | null}
     */
    Model: null,

    /**
     * @public
     * @field
     * @name Soshace.Core.View
     * @type {Function | null}
     */
    View: null,

    /**
     * @public
     * @field
     * @name Soshace.Core.Collection
     * @type {Function | null}
     */
    Collection: null,

    /**
     * @public
     * @field
     * @name Soshace.Core.Controller
     * @type {Function | null}
     */
    Controller: null,

    /**
     * Класс для работы с History Api
     *
     * @public
     * @field
     * @name Soshace.Core.History
     * @type {Function | null}
     */
    History: null,

    /**
     * @public
     * @field
     * @name Soshace.Core.Router
     * @type {Function | null}
     */
    Router: null,

    /**
     * Метод возвращает Ajax ообъект
     *
     * @public
     * @method
     * @name Soshace.Core.ajax
     * @param {string} requestType
     * @param {string} url
     * @param {Object} [params] параметры запроса
     * @returns {Soshace.core.Ajax}
     */
    ajax: function (requestType, url, params) {
        return new Soshace.core.Ajax(requestType, url, params);
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
     * @returns {Soshace.core.Ajax}
     */
    get: function (url, params) {
        return new Soshace.core.Ajax('GET', url, params);
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
     * @returns {Soshace.core.Ajax}
     */
    post: function (url, params) {
        return new Soshace.core.Ajax('POST', url, params);
    },

    /**
     * Метод возвращает Ajax ообъект
     * Метод делает PATCH запрос
     *
     * @public
     * @method
     * @name Soshace.Core.patch
     * @param {string} url
     * @param {Object} [params] параметры запроса
     * @returns {Soshace.core.Ajax}
     */
    patch: function (url, params) {
        return new Soshace.core.Ajax('PATCH', url, params);
    },

    /**
     * Метод возвращает Dom объект
     *
     * @public
     * @method
     * @name Soshace.Core.$
     * @param {string | HTMLElement} element имя селесектора или ссылка на сам елемент
     * @returns {Soshace.core.Dom}
     */
    $: function (element) {
        return new Soshace.core.Dom(element);
    },

    /**
     * Метод возвращает деферред объект
     *
     * @public
     * @method
     * @name Soshace.Core.deferred
     * @returns {Soshace.core.Deferred}
     */
    deferred: function () {
        return new Soshace.core.Deferred();
    }
};
