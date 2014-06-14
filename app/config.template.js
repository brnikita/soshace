'use strict';

/**
 * Конфигурация проекта
 */
global.Soshace = {
    /**
     * Указывает среду разработки. Включаем, если производим
     * отладку на локальной машине через IDE
     *
     * @public
     * @constant
     * name soshace.LOCAL_MACHINE
     * @type {Boolean}
     */
    LOCAL_MACHINE: true,

    /**
     * Используемый хост на локальной машине
     *
     * @public
     * @constant
     * name soshace.LOCAL_HOST
     * @type {String}
     */
    LOCAL_HOST: 'localhost',

    /**
     * @public
     * @constant
     * @name soshace.PRODUCTION_HOST
     * @type {String}
     */
    PRODUCTION_HOST: 'soshace.com',
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
     * Путь до корневой директории проекта
     *
     * @field
     * @name Soshace.DIR_NAME
     * @type {string | null}
     */
    DIR_NAME: null,

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