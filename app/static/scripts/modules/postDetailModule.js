'use strict';

/**
 * Модуль страницы просмотра поста
 *
 * @module PostDetailModule
 */

define([
    'jquery',
    'underscore',
    'utils/prettifyUtil'
], function ($, _, prettifyUtil) {
    return {

        /**
         * Контекст модуля
         *
         * @field
         * @name PostDetailModule.context
         * @type {jQuery|null}
         */
        context: null,

        /**
         * @name PostDetailModule.initialize
         * @param {object} options
         * @returns {undefined}
         */
        initialize: function (options) {
            this.context = options.context;
            prettifyUtil.byContext(this.context, 'js');
        }
    };
});