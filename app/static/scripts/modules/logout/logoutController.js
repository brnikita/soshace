'use strict';

/**
 * Контроллер выхода
 *
 * @class LogoutController
 */
define([
    'utils/controller',
    'backbone',
    'utils/helpers'
],
    function (Controller, Backbone, Helpers) {
        return Controller.extend({
            /**
             * Алиас страницы
             *
             * @field
             * @name LogoutController#pageAlias
             * @type {String}
             */
            pageAlias: 'logout',

            /**
             * @constructor
             * @name LogoutController#initialize
             * @returns {undefined}
             */
            initialize: function () {
            },

            /**
             * Метод вызывает при рендере на сервере
             *
             * @method
             * @name LogoutController#firstLoad
             * @returns {undefined}
             */
            firstLoad: function () {
            },

            /**
             * Метод вызывает при рендере на клиенте
             *
             * @method
             * @name LogoutController#firstLoad
             * @returns {undefined}
             */
            secondLoad: function () {
                $.get(Soshace.urls.api.logout).done(_.bind(function () {
                    this.logoutHandler();
                }, this));
            },

            /**
             * Метод обработчик выхода пользователя
             *
             * @method
             * @name LogoutController#logoutHandler
             * @returns {undefined}
             */
            logoutHandler: function () {
                var app = Soshace.app,
                    locale = Helpers.getLocale();

                Soshace.profile = null;
                app.getView('.js-system-messages').collection.fetch().
                    done(function () {
                        Backbone.history.navigate('/' + locale, {trigger: true});
                    });
            }

        });
    });