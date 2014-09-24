'use strict';

/**
 * Класс для работы с DOM
 *
 * @module Dom
 */
define(['./class', 'underscore'], function (Class, _) {
    /**
     * @class Dom
     */
    var Dom = Class.extend({
        /**
         * Список всех эелемнтов по этому селектору
         *
         * @public
         * @field
         * @name Dom#all
         * @type {NodeList | null}
         */
        all: null,

        /**
         * Ссылка на первый элемент доступный по селектору
         *
         * @public
         * @field
         * @name Dom#el
         * @type {HTMLElement | null}
         */
        el: null,

        /**
         * Имя селектора
         *
         * @public
         * @field
         * @name Dom#selector
         * @type {string | null}
         */
        selector: null,

        /**
         * @public
         * @constructor
         * @name Dom#initalize
         * @param {string | HTMLElement} element имя селесектора или ссылка на сам елемент
         * @returns {undefined}
         */
        initalize: function (element) {
            if (_.isString(element)) {
                this.selector = element;
                this.all = document.querySelectorAll(element);
                this.el = this.all[0];
                return;
            }

            this.el = element;
            this.all = this._makeNodeList(element);
        },

        /**
         * Метод преобразует HTMLElement в NodeList
         *
         * @private
         * @name Dom#_makeNodeList
         * @param {HTMLElement} element
         * @returns {NodeList}
         */
        _makeNodeList: function(element){
            var fragment = document.createDocumentFragment();

            fragment.appendChild(element);

            return fragment.childNodes;
        },

        /**
         * Метод проходится по всем эментам выборки по селектору
         * В callback передаются экземпляры класса Dom
         *
         * @public
         * @method
         * @name Dom#each
         * @param {Function} callback
         * @returns {Dom}
         */
        each: function (callback) {
            var i, all = this.all;

            for (i = 0; i < all.length; i++) {
                callback(new Dom(all[i]));
            }

            return this;
        },

        /**
         * @public
         * @method
         * @name Dom#data
         * @returns {Dom}
         */
        data: function(){
            return this;
        },

        /**
         * Метод навешивает слушатели на элементы DOM с выбранным селектором
         *
         * @method
         * @name Dom#on
         * @param {string} eventName
         * @param {Function} callback
         * @returns {Dom}
         */
        on: function(eventName, callback){
            var i, all = this.all;

            for (i = 0; i < all.length; i++) {
                all[i].addEventListener(eventName, callback, false);
            }

            return this;
        },

        /**
         * Метод удаляет слушатели с элементов DOM с выбранным селектором
         *
         * @method
         * @name Dom#off
         * @param {string} eventName
         * @param {Function} callback
         * @returns {Dom}
         */
        off: function(eventName, callback){
            var i, all = this.all;

            for (i = 0; i < all.length; i++) {
                all[i].addEventListener(eventName, callback, false);
            }

            return this;
        }
    });

    return Dom;
});