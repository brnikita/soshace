'use strict';

/**
 * Модуль страницы предпросмотра поста
 *
 * @module PostPreviewModule
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
         * @name PostPreviewModule.context
         * @type {jQuery|null}
         */
        context: null,

        /**
         * @name PostPreviewModule.initialize
         * @param {object} options
         * @returns {undefined}
         */
        initialize: function (options) {
            this.context = options.context;
            prettifyUtil.byContext(this.context, 'js');
        }
    };
});