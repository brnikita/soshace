'use strict';

/**
 * Класс Контроллра
 *
 * @class Controller
 */
define(['class'], function (Class) {
    return Class.extend({
        /**
         * Алиас страницы
         *
         * @field
         * @name Controller#pageAlias
         * @type {String}
         */
        pageAlias: Soshace.pageAlias,

        /**
         * Параметры запроса из роута
         *
         * @field
         * @name Controller#routeParams
         * @type {Array | null}
         */
        routeParams: null,

        /**
         * Метод вызывает при рендере на сервере
         *
         * Метод должен быть переопрделен в унаследованном классе
         *
         * @method
         * @name Controller#firstLoad
         * @returns {undefined}
         */
        firstLoad: function () {

        },

        /**
         * Метод вызывает при рендере на клиенте
         *
         * Метод должен быть переопрделен в унаследованном классе
         *
         * @method
         * @name Controller#firstLoad
         * @returns {undefined}
         */
        secondLoad: function () {

        },

        /**
         * Метод вызывавется роутером,
         * в него передаются параметры запроса
         *
         * @method
         * @name Controller#routeHandler
         * @returns {undefined}
         */
        routeHandler: function () {
            Soshace.pageAlias = this.pageAlias;

            if (typeof arguments !== 'undefined') {
                this.routeParams = arguments;
            }

            if (Soshace.firstLoad) {
                Soshace.firstLoad = false;
                this.firstLoad();
                return;
            }

            this.secondLoad();
        }
    });
});