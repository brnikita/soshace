'use strict';

/**
 * Модуль страницы добавления поста
 *
 * @module AddPostModule
 */

define([
], function () {
    return {

        /**
         * Контекст модуля
         *
         * @field
         * @name AddPostModule.context
         * @type {jQuery|null}
         */
        context: null,

        /**
         * @name AddPostModule.initialize
         * @param {object} options
         * @returns {undefined}
         */
        initialize: function (options) {
            this.context = options.context;
        }
    };
});