'use strict';

/**
 * Модуль содержит различные виджеты
 *
 * @module Widgets
 */

define([
    'underscore',
    'jquery'
], function (_, $) {
    var $loader = $('.js-loader-mask');

    return {
        /**
         * Метод перекрывает страницу
         * лоадером
         *
         * @method
         * @name Widgets.showLoader
         * @returns {undefined}
         */
        showLoader: function () {
            Soshace.app.$el.addClass('body-load');
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
            Soshace.app.$el.removeClass('body-load');
            $loader.addClass('hide');
        },

        /**
         * Метод отображает первое доступное для показа
         * сообщение из пула системных сообщений Soshace.profile.systemMessages
         *
         * @method
         * @name Widgets.showSystemMessage
         * @returns {undefined}
         */
        showSystemMessage: function () {
            var app = Soshace.app,
                systemMessages = app.isAuthenticated() && Soshace.profile.systemMessages,
                messagesExist = systemMessages instanceof Array && systemMessages.length > 0,
                currentPage = Soshace.pageAlias,
                firstAvailableMessage,
                template,
                templateOptions;

            if (!messagesExist) {
                return;
            }

            _.every(systemMessages, function (message) {
                if (message.pages.indexOf(currentPage) !== -1) {
                    firstAvailableMessage = message;
                    return false;
                }
                return true;
            });

            if (!firstAvailableMessage) {
                return;
            }

            template = Soshace.hbs[firstAvailableMessage.templatePath];
            templateOptions = firstAvailableMessage.templateOptions;
            $('.js-messages').append(template(templateOptions));
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