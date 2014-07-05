'use strict';

/**
 * Модуль определяет глобальное пространство имен
 * Soshace
 */
define(function () {
    window.Soshace = {

        /**
         * Путь до директории шаблонов
         *
         * @field
         * @name Soshace.viewsPath
         * @type {String}
         */
        viewsPath: '/static/views/',

        /**
         * Список сохраненных шаблонов
         *
         * @field
         * @name Soshace.hbs
         * @type {Object}
         */
        hbs: {},

        /**
         * Данные профиля пользователя
         *
         * @field
         * @name Soshace.profile
         * @type {Object | null}
         */
        profile: null,

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
                login: '/api/login',
                logout: '/api/logout',
                postDetails: '/api/post',
                posts: '/api/posts',
                createUser: '/api/create_user',
                user: '/api/get_user',
                profile: '/api/get_profile'
            }
        }
    };

    return window.Soshace;
});