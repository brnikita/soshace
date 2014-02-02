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
         * Родительский элемент DOM
         *
         * @field
         * @name PostPreviewModule.$el
         * @type {jQuery|null}
         */
        $el: null,

        /**
         * @name PostPreviewModule.initialize
         * @returns {undefined}
         */
        initialize: function () {
            prettifyUtil.byContext(this.$el, 'js');
        }
    };
});