'use strict';
(function (Soshace) {
    var _ = Soshace._;

    /**
     * Контроллер страницы настроек пользователя
     *
     * @class Soshace.controllers.UsersSettingsController
     */
    Soshace.controllers.UsersSettingsController = Soshace.core.Controller.extend({
        /**
         * Алиас страницы
         *
         * @field
         * @name Soshace.controllers.UsersSettingsController#pageAlias
         * @type {string}
         */
        pageAlias: 'userSettings',

        /**
         * @field
         * @name Soshace.controllers.UsersSettingsController#model
         * @type {Soshace.models.UsersModel | null}
         */
        model: null,

        /**
         * @field
         * @name Soshace.controllers.UsersSettingsController#view
         * @type {Soshace.views.UsersSettingsView | null}
         */
        view: null,

        /**
         * @constructor
         * @name Soshace.controllers.UsersSettingsController#initialize
         * @returns {undefined}
         */
        initialize: function () {
            var model,
                view;

            model = new Soshace.models.UsersModel();
            view = new Soshace.views.UsersSettingsView({
                model: model
            });

            this.model = model;
            this.view = view;
        },


        /**
         * Метод вызывает при рендере на сервере
         *
         * @method
         * @name Soshace.controllers.UsersSettingsController#firstLoad
         * @returns {undefined}
         */
        firstLoad: function () {
            var app = Soshace.app,
                $el = app.elements.contentFirstLoad,
                view = this.view;

            app.setView('.js-content', view);
            view.withoutRender($el);
        },

        /**
         * TODO: добавить обработку ошибок при получении пользователя
         *
         * Метод вызывает при рендере на клиенте
         *
         * @method
         * @name Soshace.controllers.UsersSettingsController#firstLoad
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
})(window.Soshace);