'use strict';

/**
 * Класс вида
 *
 * @module View
 */
define(['./class'], function(Class){
    return Class.extend({
        /**
         * Модель вида
         *
         * @field
         * @name View#model
         * @type {Model | null}
         */
        model: null,

        /**
         * Ссылка на родительский элемент
         *
         * @field
         * @name View#$el
         * @type {jQuery | null}
         */
        $el: null,

        /**
         * Список ссылок на элементы DOM для быстрого доступа
         *
         * @field
         * @name View#elements
         * @type {Object | null}
         */
        elements: null,

        /**
         * Список событий
         * 'eventName .js-element-class' : 'eventHandler'
         *
         * @field
         * @name View#events
         * @type {Object | null}
         */
        events: null,

        /**
         * Шаблон вида
         *
         * @field
         * @name View#template
         * @type {String | null}
         */
        template: null,

        /**
         * @constructor
         * @name View#initialize
         * @returns {undefined}
         */
        initialize: function(){

        },

        /**
         * Метод возвращает экземпляр jQuery
         * Ссылка на DOM элемент в контексте шаблона
         *
         * @method
         * @name View#$
         * @returns {jQuery}
         */
        $: function(){

        },

        /**
         * Метод возвращает сериализованную модель для
         * передачи в шаблон
         *
         * @method
         * @name View#serialize
         * @returns {Object | null}
         */
        serialize: function(){

        },

        /**
         * @method
         * @name View#setElements
         * @returns {undefined}
         */
        setElements: function(){

        },

        /**
         * @method
         * @name
         * @returns {undefined}
         */
        afterRender: function(){

        }
    });
});
