'use strict';

/**
 * Класс модели
 *
 * @module Model
 */
define(['./class'], function (Class) {
    return Class.extend({

        /**
         * Название id атрибута, по наличию которого определяется
         * наличие модели в базе
         *
         * @public
         * @field
         * @name Model#idAttribute
         * @type {string}
         */
        isAttribute: '_id',

        /**
         * Список измененных  полей модели
         *
         * @private
         * @field
         * @name Model#_changed
         * @type {Object | null}
         */
        _changed: null,

        /**
         * API модели
         *
         * @public
         * @field
         * @name Model#url
         * @type {Function | string | null}
         */
        url: null,

        /**
         * @private
         * @field
         * @name Model#attributes
         * @type {Object | null}
         */
        _attributes: null,

        /**
         * @public
         * @constructor
         * @name Model.initialize
         * @returns {undefined}
         */
        initialize: function () {
        },

        /**
         * Метод вовзращает значение атрибута
         *
         * @public
         * @method
         * @name Model#get
         * @param {string} attributeName имя аттрибута
         * @returns {*}
         */
        get: function(attributeName){

        },

        /**
         * Метод записывает атрибуты в модель
         *
         * @public
         * @method
         * @name Model#set
         * @returns {undefined}
         */
        set: function(){

        },

        /**
         * Метод возвращет атрибуты модели
         *
         * @public
         * @method
         * @name Model#toJSON
         * @returns {Object | null}
         */
        toJSON: function(){
            return this._attributes;
        },

        /**
         * Метод возвращает список измененных полей
         *
         * @public
         * @method
         * @name Model#getChanged
         * @returns {Object | null}
         */
        getChanged: function(){
            return this._changed;
        },

        /**
         * Метод возвращает true, если модель ещё не сохранена в базе
         *
         * @public
         * @method
         * @name Model#isNew
         * @returns {boolean}
         */
        isNew: function () {
            return this.get(this.isAttribute) === null;
        },

        parse: function () {

        },

        save: function () {

        },

        fetch: function(){

        }

    });
});