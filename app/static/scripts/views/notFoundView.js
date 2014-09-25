'use strict';

/**
 * Вид страницы 404
 *
 * @class NotFoundView
 */

define([
    'core',
    'global',
    'templates'
], function (Core, Soshace) {
    return Core.extend({
        /**
         * Путь до шаблона
         *
         * @field
         * @name NotFoundView#template
         * @type {string}
         */
        template: Soshace.hbs['404']
    });
});