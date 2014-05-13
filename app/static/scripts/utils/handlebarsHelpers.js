'use strict';

/**
 * Вспомогательные методы для шаблонизатора
 * Handlebars
 *
 * @module HandlebarsHelpers
 */

define([
    'handlebars',
    'utils/helpers'
], function (Handlebars, Helpers) {
    /**
     * Метод перевода
     */
    Handlebars.registerHelper('i18n', function (value) {
        var locale = Helpers.getLocale(),
            translations = Soshace.locales[locale];

        if (typeof translations === 'undefined') {
            return value;
        }

        if (typeof translations[value] === 'undefined') {
            return value;
        }

        return translations[value];
    });
});