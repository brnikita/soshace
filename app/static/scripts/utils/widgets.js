'use strict';

/**
 * Модуль содержит различные виджеты
 *
 * @module Widgets
 */

define([
    'jquery'
], function ($) {
    var $loader = $('.js-loader-mask'),
        $body = $('body');

    return {
        /**
         * TODO: сделать, чтобы метод не удалял классы целиком
         *
         * Метод меняет класс у тела страницы
         *
         * @method
         * @name Widgets.showMessages
         * @param {string} bodyClass новый класс body
         * @returns {undefined}
         */
        setBodyClass: function (bodyClass) {
            $body.attr('class', bodyClass);
        },

        /**
         * Метод перекрывает страницу
         * лоадером
         *
         * @method
         * @name Widgets.showLoader
         * @returns {undefined}
         */
        showLoader: function () {
            $body.addClass('body-load');
            $loader.removeClass('hide');
        },

        /**
         * Метод убирает со страницы лоадер
         *
         * @method
         * @name Widgets.showLoader
         * @returns {undefined}
         */
        hideLoader: function () {
            $body.removeClass('body-load');
            $loader.addClass('hide');
        },

        /**
         * TODO: переделать на плагин
         *
         * Форматирует блоки с классом .prettyprint
         * в переданном контексте
         *
         * @name Widgets.prettify
         * @param {jQuery} context элемент DOM
         * @param {string} codeLanguage
         * @returns {undefined}
         */
        prettify: function (context, codeLanguage) {
            var $prettyPrint = $('.prettyprint', context),
                formattedHtml;

            $prettyPrint.each(function () {
                var codeBlock = $(this);

                formattedHtml = prettyPrintOne(codeBlock.html(), codeLanguage, true);
                codeBlock.html(formattedHtml);
            });
        }
    };
});