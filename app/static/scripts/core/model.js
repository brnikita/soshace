'use strict';

/**
 * Класс модели
 *
 * @module Model
 */
define(['./dom', 'underscore', './event', './ajax'], function (Dom, _, Event, Ajax) {
    return Event.extend({

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
         * Дефолтные значения полей
         *
         * @field
         * @name Model#defaults
         * @type {Object | null}
         */
        defaults: null,

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
         * @name Model#initialize
         * @returns {undefined}
         */
        initialize: function () {
            this._setDefaultsToAttribute();
        },

        /**
         * Метод возвращает путь API
         *
         * @private
         * @method
         * @name Model#initialize
         * @returns {string}
         */
        _getUrl: function () {
            var url = this.url;

            if (_.isFunction(url)) {
                return url();
            }

            return url;
        },

        /**
         * Метод устанавливает дефолтные значения полей в модель
         *
         * @private
         * @method
         * @name Model#_setDefaultsToAttribute
         * @returns {undefined}
         */
        _setDefaultsToAttribute: function () {
            if (this.defaults !== null) {
                this._attributes = _.clone(this.defaults);
            }
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
        get: function (attributeName) {
            return this._attributes[attributeName];
        },

        /**
         * Метод записывает атрибуты в модель
         *
         * @public
         * @method
         * @name Model#set
         * @param {Object} attributes
         * @param {Object} [options]
         * @returns {undefined}
         */
        set: function (attributes, options) {
            var silent = options.silent,
                _attributes = this._attributes || {};

            this._attributes = _.extend(_attributes, attributes);
            this._setChanged(attributes);

            if (!silent) {
                this.trigger('change');
            }
        },

        /**
         * Метод возвращет атрибуты модели
         *
         * @public
         * @method
         * @name Model#toJSON
         * @returns {Object | null}
         */
        toJSON: function () {
            return this._attributes;
        },

        /**
         * Метод устанавливает измененные поля
         *
         * @private
         * @method
         * @param {Object} attributes
         * @name Model#_setChanged
         * @returns {undefined}
         */
        _setChanged: function (attributes) {
            var _changed = this._changed || {};

            this._changed = _.extend(_changed, attributes);
        },

        /**
         * Метод возвращает список измененных полей
         *
         * @public
         * @method
         * @name Model#getChanged
         * @returns {Object | null}
         */
        getChanged: function () {
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

        /**
         * Метод парсит ответ сервера
         * Метод можно переопределить в своей модели
         *
         * @method
         * @name Model#parse
         * @param {Object} response
         * @returns {Object}
         */
        parse: function (response) {
            return response;
        },

        /**
         * Метод сохраняет модель
         *
         * @method
         * @name Model#save
         * @returns {$.Deferred}
         */
        save: function () {

        },

        /**
         * @method
         * @name Model#fetch
         * @returns {$.Deferred}
         */
        fetch: function (options) {
            var request = new Ajax('GET', this._getUrl()),
                deferred = request.deferred;

            deferred.done(_.bind(function (data) {
                var response = data.response;
                this.set(this.parse(response), options);
            }, this));

            return deferred;
        }

    });
});