'use strict';

/**
 * Конфигурация проекта
 */
global.Soshace = {
    /**
     * Версия, берется из package.json
     * Ставится скриптом атоматом
     *
     * @field
     * @name Soshace.VERSION
     * @type {string}
     */
    VERSION: '0',

    /**
     * Урл админки
     *
     * @constant
     * @name Soshace.ADMIN_URL
     * @type {string}
     */
    ADMIN_URL: 'xxx191188',

    /**
     * Окружение
     *
     * @field
     * @name Soshace.IS_PRODUCTION
     * @type {boolean}
     */
    IS_PRODUCTION: true,

    /**
     * хост базы данных
     *
     * @constant
     * @name Soshace.DB_HOST
     * @type {string}
     */
    DB_HOST: 'mongodb://localhost/soshace',

    /**
     * Порт который слушает наш node.js сервер
     *
     * @constant
     * @name Soshace.PORT
     * @type {string}
     */
    PORT: '8080',

    /**
     * Хост который слушает наш node.js сервер
     *
     * @constant
     * @name Soshace.HOST
     * @type {string}
     */
    HOST: '127.0.0.1',

    /**
     * Локаль по дефолту
     *
     * @public
     * @constant
     * @name Soshace.DEFAULT_LOCALE
     * @type {string}
     */
    DEFAULT_LOCALE: 'ru',

    /**
     * Доступные локали
     *
     * @public
     * @constant
     * @name Soshace.LOCALES
     * @type {String[]}
     */
    LOCALES: [
        'en',
        'ru'
    ],

    /**
     * Полное название локалей
     * Названия должны идти в том же порядке, что и локали
     *
     * @public
     * @constant
     * @name Soshace.LANGUAGES
     * @type {String[]}
     */
    LANGUAGES: [
        'English',
        'Russian'
    ],

    /**
     * Домен
     *
     * @public
     * @constant
     * @name Soshace.PRODUCTION_DOMAIN
     * @type {string}
     */
    PRODUCTION_DOMAIN: '//soshace.com/',

    /**
     * Директория для медиа файлов
     *
     * @public
     * @constant
     * @name Soshace.MEDIA_DIRECTORY
     * @type {string}
     */
    MEDIA_DIRECTORY: '/home/user/media/',

    /**
     * Количество статей на страницу
     *
     * @public
     * @constant
     * @name Soshace.POSTS_PER_PAGE
     * @type {number}
     */
    POSTS_PER_PAGE: 10,
    /**
     * @public
     * @constant
     * @name Soshace.MAIL_SERVICE
     * @type {String}
     */
    MAIL_SERVICE: 'yandex',

    /**
     * @public
     * @constant
     * @name Soshace.MAIL_USER
     * @type {String}
     */
    MAIL_NO_REPLY: 'noreply@soshace.com',

    /**
     * @public
     * @constant
     * @name Soshace.MAIL_PASSWORD
     * @type {String}
     */
    MAIL_NO_REPLY_PASSWORD: ''
};