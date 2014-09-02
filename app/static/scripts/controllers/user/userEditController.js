'use strict';

/**
 * Контроллер страницы редактирования пользователя
 *
 * @class UserEditController
 */
define([
        'underscore',
        'utils/controller',
        'models/userModel',
        'views/user/userEditView'
    ],
    function (_, Controller, UserModel, UserEditView) {
        return Controller.extend({
            /**
             * Алиас страницы
             *
             * @field
             * @name UserEditController#pageAlias
             * @type {String}
             */
            pageAlias: 'user',

            /**
             * @field
             * @name UserEditController#model
             * @type {UserModel | null}
             */
            model: null,

            /**
             * @field
             * @name UserEditController#view
             * @type {UserEditView | null}
             */
            view: null,

            /**
             * @constructor
             * @name UserEditController#initialize
             * @returns {undefined}
             */
            initialize: function () {
                var model,
                    view;

                model = new UserModel();
                view = new UserEditView({
                    model: model
                });

                this.model = model;
                this.view = view;
            },


            /**
             * Метод вызывает при рендере на сервере
             *
             * @method
             * @name UserEditController#firstLoad
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
             * @name UserEditController#firstLoad
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