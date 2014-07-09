'use strict';

/**
 * Плагин для добавления масок полям
 */
define([
    'jquery',
    'underscore',
    'utils/helpers'
], function ($, _, Helpers) {
    var methods = {
        /**
         * @constructor
         * @param {Object} options
         * @returns {undefined}
         */
        initialize: function (options) {
            return this.each(function () {
                var $this = $(this);

            });
        }
    };

    $.fn.masks = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }

        if (typeof method === 'object' || !method) {
            return methods.initialize.apply(this, arguments);
        }

        return $.error('Метод с именем ' + method + ' не существует для jQuery.masks');

    };
});