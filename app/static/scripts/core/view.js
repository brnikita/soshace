'use strict';

/**
 * Класс вида
 *
 * @class Soshace.core.View
 */
Soshace.core.View = Soshace.core.Class.extend({
    /**
     * Модель вида
     *
     * @field
     * @name Soshace.core.View#model
     * @type {Model | null}
     */
    model: null,

    /**
     * Ссылка на родительский элемент
     *
     * @field
     * @name Soshace.core.View#$el
     * @type {jQuery | null}
     */
    $el: null,

    /**
     * Список ссылок на элементы DOM для быстрого доступа
     *
     * @field
     * @name Soshace.core.View#elements
     * @type {Object | null}
     */
    elements: null,

    /**
     * Список событий
     * 'eventName .js-element-class' : 'eventHandler'
     *
     * @field
     * @name Soshace.core.View#events
     * @type {Object | null}
     */
    events: null,

    /**
     * Шаблон вида
     *
     * @field
     * @name Soshace.core.View#template
     * @type {string | null}
     */
    template: null,

    /**
     * @constructor
     * @name Soshace.core.View#initialize
     * @returns {undefined}
     */
    initialize: function () {

    },

    /**
     * Метод возвращает экземпляр jQuery
     * Ссылка на DOM элемент в контексте шаблона
     *
     * @method
     * @name Soshace.core.View#$
     * @returns {jQuery}
     */
    $: function () {

    },

    /**
     * Метод возвращает сериализованную модель для
     * передачи в шаблон
     *
     * @method
     * @name Soshace.core.View#serialize
     * @returns {Object | null}
     */
    serialize: function () {

    },

    /**
     * @method
     * @name Soshace.core.View#setElements
     * @returns {undefined}
     */
    setElements: function () {

    },

    /**
     * @method
     * @name
     * @returns {undefined}
     */
    afterRender: function () {

    }
});