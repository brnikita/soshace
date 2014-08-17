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
         * Список системных сообщений
         *
         * @field
         * @name Soshace.systemMessages
         * @type {Array | null}
         */
        systemMessages: null,

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
         * @constant
         * @name Soshace.urls
         * @type {Object}
         */
        urls: {
            static: '/static/',
            locales: '/static/locales/',
            scripts: 'static/scripts/',
            images: '/static/images/',
            api: {
                login: '/api/login',
                logout: '/api/logout',
                post: '/api/posts/0',
                posts: '/api/posts',
                createUser: '/api/users',
                images: '/api/images',
                user: '/api/users/0',
                profile: '/api/profile',
                systemMessage: '/api/system_messages/0',
                systemMessages: '/api/system_messages',
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
            userName: /^[a-z\.\-_0-9]+$/,
            isEmptyHtml: /^(<br>|\s|<div>(<br>|\s|&nbsp;)*<\/div>|&nbsp;)*$/
        },

        /**
         * Алиас текущей страницы, задается в контроллере страницы
         *
         * @field
         * @name Soshace.pageAlias
         * @type {String}
         */
        pageAlias: 'home'
    };

    return window.Soshace;
});