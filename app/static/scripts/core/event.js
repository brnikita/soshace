'use strict';

/**
 * Класс для работы с событиями
 *
 * @module Event
 */
define(['./class'], function (Class) {
    return Class.extend({
        /**
         * Поле хранит список событий
         * имя события: callback
         *
         * @field
         * @name Event#_events
         * @type {Object | null}
         */
        _events: null,

        /**
         * @constructor
         * @name Event#initialize
         * @returns {undefined}
         */
        initialize: function () {

        },

        /**
         * Метод добавляет событие и callback в список событий
         *
         * @method
         * @param {string} name имя события
         * @param {Function} callback
         */
        on: function (name, callback) {
        },

        once: function (name, callback) {
        },

        off: function (name, callback, context) {
        },

        trigger: function (name) {
        }


    });
});