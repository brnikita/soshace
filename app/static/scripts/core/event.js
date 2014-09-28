'use strict';
(function (Soshace) {
    /**
     * Класс для работы с событиями
     *
     * @class Soshace.core.Event
     */
    Soshace.core.Event = Soshace.core.Class.extend({
        /**
         * Поле хранит список событий
         * имя события: callback
         *
         * @private
         * @field
         * @name Soshace.core.Event#_eventHandlers
         * @type {Object | null}
         */
        _eventHandlers: null,

        /**
         * @constructor
         * @name Soshace.core.Event#initialize
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
         *  @name Soshace.core.Event#on
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
         *  @name Soshace.core.Event#off
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
         *  @name Soshace.core.Event#trigger
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
})(window.Soshace);