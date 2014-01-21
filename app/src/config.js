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
    HOST: '127.0.0.1'
};