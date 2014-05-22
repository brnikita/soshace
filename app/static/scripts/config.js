'use strict';

/**
 * Модуль определяет глобальное пространство имен
 * Soshace
 */
define(function () {
    window.Soshace = {
        /**
         * Список сохраненных шаблонов
         *
         * @field
         * @name Soshace.hbs
         * @type {Object}
         */
        hbs: {},

        /**
         * @field
         * @name Soshace.firstLoad
         * @type {boolean}
         */
        firstLoad: true,

        /**
         * Поле, содержащее перводы
         *
         * @field
         * @name Soshace.locales
         * @type {Object}
         */
        locales: {},

        /**
         * Поле, содержащее относительнные пути
         * до статики и API
         *
         * @field
         * @name Soshace.urls
         * @type {Object}
         */
        urls: {
            locales: '/static/locales/',
            scripts: 'static/scripts/',
            api: {
                postDetails: '/api/post',
                posts: '/api/posts',
                saveUser: '/api/saveUser'
            }
        }
    };

    return window.Soshace;
});