'use strict';

/**
 * Конфигурация проекта
 */
global.soshace = {
    /**
     * Версия, берется из package.json
     * Ставится скриптом атоматом
     *
     * @field
     * @name soshace.VERSION
     * @type {string}
     */
    VERSION: '0',

    /**
     * Урл админки
     *
     * @constant
     * @name soshace.ADMIN_URL
     * @type {string}
     */
    ADMIN_URL: 'xxx191188',

    /**
     * Окружение
     *
     * @field
     * @name soshace.ENVIRONMENT
     * @type {string}
     */
    ENVIRONMENT: 'development',

    /**
     * хост базы данных
     *
     * @constant
     * @name soshace.DB_HOST
     * @type {string}
     */
    DB_HOST: 'mongodb://localhost/soshace',

    /**
     * Порт который слушает наш node.js сервер
     *
     * @constant
     * @name soshace.PORT
     * @type {string}
     */
    PORT: '8080',

    /**
     * Хост который слушает наш node.js сервер
     *
     * @constant
     * @name soshace.HOST
     * @type {string}
     */
    HOST: '127.0.0.1',

    /**
     * Локаль по дефолту
     *
     * @public
     * @constant
     * @name soshace.DEFAULT_LOCALE
     * @type {string}
     */
    DEFAULT_LOCALE: 'ru',

    /**
     * Доступные локали
     *
     * @public
     * @constant
     * @name soshace.LOCALES
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
     * @name soshace.LANGUAGES
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
     * @name soshace.PRODUCTION_DOMAIN
     * @type {string}
     */
    PRODUCTION_DOMAIN: '//soshace.com/',

    /**
     * Директория для медиа файлов
     *
     * @public
     * @constant
     * @name soshace.MEDIA_DIRECTORY
     * @type {string}
     */
    MEDIA_DIRECTORY: '/home/user/media/'
};