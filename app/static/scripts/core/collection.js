'use strict';

/**
 * Класс коллекции
 *
 * @module Collection
 */
define(['underscore', './event', './ajax'], function (_, Event, Ajax) {
    return Event.extend({
        /**
         * API модели
         *
         * @public
         * @field
         * @name Collection#url
         * @type {Function | string | null}
         */
        url: null,

        /**
         * Класс модели
         *
         * @field
         * @name Collection#model
         * @type {Model}
         */
        model: null,

        /**
         * Список моделей
         *
         * @field
         * @name Collection#models
         * @type {Array}
         */
        models: null,

        /**
         * @public
         * @constructor
         * @name Collection#initialize
         * @returns {undefined}
         */
        initialize: function () {
        },

        /**
         * Метод возвращает путь API
         *
         * @private
         * @method
         * @name Collection#initialize
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
         * Метод добавляет модель в коллекцию
         *
         * @public
         * @method
         * @name Collection#add
         * @param {Object} attributes
         * @returns {Collection}
         */
        add: function (attributes) {
            var model,
                models = this.models;

            if (_.isNull(models)) {
                models = this.models = [];
            }
            model = new this.model(attributes);
            models.push(model);
        },

        /**
         * Метод возвращет сериализованную коллекцию
         *
         * @public
         * @method
         * @name Collection#toJSON
         * @returns {Object | null}
         */
        toJSON: function () {
            var i,
                models = this.models,
                collection = [];

            for (i = 0; models.length; i++) {
                collection.push(models[i].toJSON());
            }

            return collection;
        },

        /**
         * Метод парсит ответ сервера
         * Метод можно переопределить в своей модели
         *
         * @method
         * @name Collection#parse
         * @param {Object} response
         * @returns {Object}
         */
        parse: function (response) {
            return response;
        },

        /**
         * Метод берет данные с сервера
         *
         * @method
         * @name Collection#fetch
         * @param {Object} [options]
         *                 options.params - параметры запроса
         * @returns {Ajax}
         */
        fetch: function (options) {
            var params = options && options.params,
                request = new Ajax('GET', this._getUrl(), params);

            request.done(_.bind(function (response) {
                var i, results = this.parse(response);

                for (i = 0; i < results.length; i++) {
                    this.add(results[i]);
                }
            }, this));

            return request;
        }
    });
});