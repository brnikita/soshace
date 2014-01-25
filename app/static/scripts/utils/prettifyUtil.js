'use strict';

/**
 * Модуль расширение для google-code-prettify
 *
 * @module PrettifyUtil
 */

define([
    'jquery',
    'underscore',
    'prettify'
], function () {
    return {

        /**
         * Форматирует блоки с классом .prettyprint
         * в переданном контексте
         *
         * @name PrettifyUtil.byContext
         * @param {jQuery} context
         * @param {string} codeLanguage
         * @returns {undefined}
         */
        byContext: function (context, codeLanguage) {
            var $prettyPrint = $('.prettyprint', context),
                formattedHtml;

            $prettyPrint.each(function(){
                var codeBlock = $(this);

                formattedHtml = prettyPrintOne(codeBlock.html(), codeLanguage, true);
                codeBlock.html(formattedHtml);
            });
        }
    };
});