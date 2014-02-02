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
         * Родительский элемент DOM
         *
         * @field
         * @name PostDetailModule.$el
         * @type {jQuery|null}
         */
        $el: null,

        /**
         * @name PostDetailModule.initialize
         * @returns {undefined}
         */
        initialize: function () {
            prettifyUtil.byContext(this.context, 'js');
        }
    };
});