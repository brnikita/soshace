'use strict';
(function (Soshace) {
    var _ = Soshace._;

    /**
     * Класс модели
     *
     * @class Soshace.core.Model
     */
    Soshace.core.Model = Soshace.core.Event.extend({

        /**
         * Название id атрибута, по наличию которого определяется
         * наличие модели в базе
         *
         * @public
         * @field
         * @name Soshace.core.Model#idAttribute
         * @type {string}
         */
        isAttribute: '_id',

        /**
         * Список измененных  полей модели
         *
         * @private
         * @field
         * @name Soshace.core.Model#_changed
         * @type {Object | null}
         */
        _changed: null,

        /**
         * API модели
         *
         * @public
         * @field
         * @name Soshace.core.Model#url
         * @type {Function | string | null}
         */
        url: null,

        /**
         * Дефолтные значения полей
         *
         * @field
         * @name Soshace.core.Model#defaults
         * @type {Object | null}
         */
        defaults: null,

        /**
         * @private
         * @field
         * @name Soshace.core.Model#attributes
         * @type {Object | null}
         */
        _attributes: null,

        /**
         * @public
         * @constructor
         * @name Soshace.core.Model#initialize
         * @param {Object} attributes
         * @returns {undefined}
         */
        initialize: function (attributes) {
            this.set(attributes, {silent: true});
            this._setDefaultsToAttribute();
        },

        /**
         * Метод возвращает путь API
         *
         * @private
         * @method
         * @name Soshace.core.Model#initialize
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
         * @name Soshace.core.Model#_setDefaultsToAttribute
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
         * @name Soshace.core.Model#get
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
         * @name Soshace.core.Model#set
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
         * @name Soshace.core.Model#toJSON
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
         * @name Soshace.core.Model#_setChanged
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
         * @name Soshace.core.Model#getChanged
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
         * @name Soshace.core.Model#isNew
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
         * @name Soshace.core.Model#parse
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
         * @name Soshace.core.Model#save
         * @param {Object} options
         *                 options.patch сделать PATCH измененных данных
         * @returns {Ajax}
         */
        save: function (options) {
            var params,
                request,
                url = this._getUrl();

            if (options.patch && this.isNew()) {
                params = this.getChanged();
                request = Soshace.core.patch(url, params);
            } else {
                params = this.toJSON();
                request = Soshace.core.post(url, params);
            }

            request.done(_.bind(function (data) {
                var response = data.response;
                this.set(this.parse(response), {silent: true});
                this._changed = null;
            }, this));

            return request;
        },

        /**
         * Метод берет данные с сервера
         *
         * @method
         * @name Soshace.core.Model#fetch
         * @param {Object} options
         *                 options.params - параметры запроса
         * @returns {Ajax}
         */
        fetch: function (options) {
            var request = Soshace.core.get(this._getUrl(), options.params);

            request.done(_.bind(function (data) {
                var response = data.response;
                this.set(this.parse(response));
            }, this));

            return request;
        }
    });
})(window.Soshace);