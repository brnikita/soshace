'use strict';

/**
 * Класс для работы с DOM
 *
 * @class Soshace.core.Dom
 */
Soshace.core.Dom = Soshace.core.Class.extend({
    /**
     * Список всех эелемнтов по этому селектору
     *
     * @public
     * @field
     * @name Soshace.core.Dom#all
     * @type {NodeList | null}
     */
    all: null,

    /**
     * Ссылка на первый элемент доступный по селектору
     *
     * @public
     * @field
     * @name Soshace.core.Dom#el
     * @type {HTMLElement | null}
     */
    el: null,

    /**
     * Имя селектора
     *
     * @public
     * @field
     * @name Soshace.core.Dom#selector
     * @type {string | null}
     */
    selector: null,

    /**
     * @public
     * @constructor
     * @name Soshace.core.Dom#initalize
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
     * @name Soshace.core.Dom#_makeNodeList
     * @param {HTMLElement} element
     * @returns {NodeList}
     */
    _makeNodeList: function (element) {
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
     * @name Soshace.core.Dom#each
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
     * @name Soshace.core.Dom#data
     * @returns {Dom}
     */
    data: function () {
        return this;
    },

    /**
     * Метод навешивает слушатели на элементы DOM с выбранным селектором
     *
     * @public
     * @method
     * @name Soshace.core.Dom#on
     * @param {string} eventName
     * @param {Function} callback
     * @returns {Dom}
     */
    on: function (eventName, callback) {
        var i, all = this.all;

        for (i = 0; i < all.length; i++) {
            all[i].addEventListener(eventName, callback, false);
        }

        return this;
    },

    /**
     * Метод удаляет слушатели с элементов DOM с выбранным селектором
     *
     * @public
     * @method
     * @name Soshace.core.Dom#off
     * @param {string} eventName
     * @param {Function} callback
     * @returns {Dom}
     */
    off: function (eventName, callback) {
        var i, all = this.all;

        for (i = 0; i < all.length; i++) {
            all[i].addEventListener(eventName, callback, false);
        }

        return this;
    },

    /**
     * Метод добавляет класс всей группе элементов
     *
     * @public
     * @method
     * @name Soshace.core.Dom#addClass
     * @param {string} className
     * @returns {Dom}
     */
    addClass: function (className) {
        return this;
    },

    /**
     * Метод удаляет класс у всей группы элементов
     *
     * @public
     * @method
     * @name Soshace.core.Dom#removeClass
     * @param {string} className
     * @returns {Dom}
     */
    removeClass: function (className) {
        return this;
    },

    /**
     * Метод добавляет аттрибут всей группе элементов
     *
     * @public
     * @method
     * @name Soshace.core.Dom#addAttr
     * @param {string} attrName
     * @param {string | number} attrValue
     * @returns {Dom}
     */
    addAttr: function (attrName, attrValue) {
        return this;
    },

    /**
     * Метод удаляет аттрибут у всей группе элементов
     *
     * @public
     * @method
     * @name Soshace.core.Dom#removeAttr
     * @param {string} attrName
     * @returns {Dom}
     */
    removeAttr: function (attrName) {
        return this;
    },

    /**
     * Метод возвращает значение аттрибута для первого элемента в группе элементов
     *
     * @public
     * @method
     * @name Soshace.core.Dom#getAttr
     * @param {string} attrName
     * @returns {string} значение аттрибута
     */
    getAttr: function (attrName) {
    },

    /**
     * Метод задает значение аттрибута для всей группы элементов
     *
     * @public
     * @method
     * @name Soshace.core.Dom#setAttr
     * @param {string} attrName
     * @param {string | number} attrValue
     * @returns {Dom}
     */
    setAttr: function (attrName, attrValue) {
        return this;
    },

    /**
     * Метод возвращает значение аттрибута для первого элемента в группе элементов
     *
     * Если передан второй параметр, то:
     * Метод задает значение аттрибута для всей группы элементов
     *
     * @public
     * @method
     * @name Soshace.core.Dom#attr
     * @param {string} attrName
     * @param {string | number} attrValue
     * @returns {Dom | string}
     */
    attr: function (attrName, attrValue) {
        if (_.isUndefined(attrValue)) {
            return this.getAttr(attrName);
        }

        return this.setAttr(attrName, attrValue);
    }
});
