'use strict';

/**
 * Вспомогательные методы для шаблонизатора
 * Handlebars
 *
 * @module HandlebarsHelpers
 */

define([
    'underscore',
    'handlebars',
    'utils/helpers'
], function (_, Handlebars, Helpers) {
    /**
     * Метод перевода
     */
    Handlebars.registerHelper('i18n', _.bind(Helpers.i18n, Helpers));
});