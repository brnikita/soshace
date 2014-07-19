'use strict';

/**
 * Класс Контроллра
 *
 * @class Controller
 */
define(['class', 'config'], function (Class) {
    return Class.extend({
        options: null,

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
         * @param {Object} options параметры запроса
         * @returns {undefined}
         */
        routeHandler: function (options) {
            if (typeof options !== 'undefined') {
                this.options = options;
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