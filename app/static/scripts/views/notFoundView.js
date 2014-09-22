'use strict';

/**
 * Вид страницы 404
 *
 * @class NotFoundView
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'backbone.layoutmanager',
    'templates'
], function ($, _, Backbone) {
    return Backbone.Layout.extend({
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