'use strict';

/**
 * Модуль определяет глобальное пространство имен
 * Soshace
 */
define(function () {
    if (typeof window.Soshace !== 'undefined') {
        return;
    }

    window.Soshace = {
        /**
         * Ссылка на экземпляр приложения
         *
         * @field
         * @name Soshace.app
         * @type {Backbone.Layout}
         */
        app: null,

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
         * Список путей
         *
         * @field
         * @name Soshace.paths
         * @type {Object}
         */
        paths: {
            static: '/static/',
            scripts: '/static/scripts/',
            views: '/static/views/'
        },

        /**
         * Поле, содержащее относительнные пути
         * до статики и API
         *
         * @constant
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
                profile: '/api/get_profile',
                registration: {
                    validateField: '/api/registration/validate_field'
                }
            }
        },

        /**
         * Список регулярных выражений
         *
         * @constant
         * @name Soshace.patterns
         * @type {Object}
         */
        patterns: {
            email: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            userName: /^[a-z\.\-_0-9]+$/
        }
    };

    return window.Soshace;
});