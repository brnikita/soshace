'use strict';

/**
 * Контроллер страницы настроек пользователя
 *
 * @class UserSettingsController
 */
define([
        'underscore',
        'utils/controller',
        'models/userModel',
        'views/user/UserSettingsView'
    ],
    function (_, Controller, UserModel, UserSettingsView) {
        return Controller.extend({
            /**
             * Алиас страницы
             *
             * @field
             * @name UserSettingsController#pageAlias
             * @type {String}
             */
            pageAlias: 'user',

            /**
             * @field
             * @name UserSettingsController#model
             * @type {UserModel | null}
             */
            model: null,

            /**
             * @field
             * @name UserSettingsController#view
             * @type {UserSettingsView | null}
             */
            view: null,

            /**
             * @constructor
             * @name UserSettingsController#initialize
             * @returns {undefined}
             */
            initialize: function () {
                var model,
                    view;

                model = new UserModel();
                view = new UserSettingsView({
                    model: model
                });

                this.model = model;
                this.view = view;
            },


            /**
             * Метод вызывает при рендере на сервере
             *
             * @method
             * @name UserSettingsController#firstLoad
             * @returns {undefined}
             */
            firstLoad: function () {
                var app = Soshace.app,
                    $contentFirstLoad = app.elements.contentFirstLoad,
                    view = this.view;

                app.setView('.js-content', view);
                view.withoutRender($contentFirstLoad);
            },

            /**
             * TODO: добавить обработку ошибок при получении пользователя
             *
             * Метод вызывает при рендере на клиенте
             *
             * @method
             * @name UserSettingsController#firstLoad
             * @returns {undefined}
             */
            secondLoad: function () {
                var view = this.view,
                    app = Soshace.app,
                    params = this.routeParams;

                this.model.set({
                    locale: params[0],
                    userName: params[1]
                });

                this.model.getUser().done(_.bind(function () {
                    app.setView('.js-content', view).render();
                }, this));
            }
        });
    });