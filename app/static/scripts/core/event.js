'use strict';

/**
 * Класс для работы с событиями
 *
 * @module Event
 */
define(['./class'], function (Class) {
    /**
     * @class Event
     */
    return Class.extend({
        /**
         * Поле хранит список событий
         * имя события: callback
         *
         * @private
         * @field
         * @name Event#_eventHandlers
         * @type {Object | null}
         */
        _eventHandlers: null,

        /**
         * @constructor
         * @name Event#initialize
         * @returns {undefined}
         */
        initialize: function () {
            this._eventHandlers = [];
        },

        /**
         * Подписка на событие
         * Использование:
         *  Obj.on('select', function(item) { ... }
         *
         *  @public
         *  @name Event#on
         *  @param {string} eventName имя события
         *  @param {Function} handler обработчик
         *  @returns {undefined}
         */
        on: function (eventName, handler) {
            if (!this._eventHandlers[eventName]) {
                this._eventHandlers[eventName] = [];
            }
            this._eventHandlers[eventName].push(handler);
        },
        /**
         * Прекращение подписки
         *  Obj.off('select',  handler)
         *
         *  @public
         *  @name Event#off
         *  @param {string} eventName имя события
         *  @param {Function} handler обработчик
         *  @returns {undefined}
         */
        off: function (eventName, handler) {
            var i,
                handlers = this._eventHandlers[eventName];
            if (!handlers) {
                return;
            }
            for (i = 0; i < handlers.length; i++) {
                if (handlers[i] === handler) {
                    handlers.splice(i--, 1);
                }
            }
        },

        /**
         * Генерация события с передачей данных
         *  Obj.trigger('select', item);
         *
         *  @public
         *  @name Event#trigger
         *  @param {string} eventName имя события
         *  @returns {undefined}
         */
        trigger: function (eventName) {
            var handlers, i;

            if (!this._eventHandlers[eventName]) {
                return; // обработчиков для события нет
            }
            // вызвать обработчики
            handlers = this._eventHandlers[eventName];
            for (i = 0; i < handlers.length; i++) {
                handlers[i].apply(this, [].slice.call(arguments, 1));
            }
        }

    });
});