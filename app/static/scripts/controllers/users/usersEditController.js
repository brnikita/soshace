'use strict';
(function (Soshace) {
    var _ = Soshace._;

    /**
     * Контроллер страницы редактирования пользователя
     *
     * @class Soshace.controllers.UsersEditController
     */
    Soshace.controllers.UsersEditController = Soshace.core.Controller.extend({
        /**
         * Алиас страницы
         *
         * @field
         * @name Soshace.controllers.UsersEditController#pageAlias
         * @type {string}
         */
        pageAlias: 'userEdit',

        /**
         * @field
         * @name Soshace.controllers.UsersEditController#model
         * @type {Soshace.models.UsersModel | null}
         */
        model: null,

        /**
         * @field
         * @name Soshace.controllers.UsersEditController#view
         * @type {Soshace.views.UsersEditView | null}
         */
        view: null,

        /**
         * @constructor
         * @name Soshace.controllers.UsersEditController#initialize
         * @returns {undefined}
         */
        initialize: function () {
            var model,
                view;

            model = new Soshace.models.UsersModel();
            view = new Soshace.views.UsersEditView({
                model: model
            });

            this.model = model;
            this.view = view;
        },


        /**
         * Метод вызывает при рендере на сервере
         *
         * @method
         * @name Soshace.controllers.UsersEditController#firstLoad
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
         * @name Soshace.controllers.UsersEditController#firstLoad
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