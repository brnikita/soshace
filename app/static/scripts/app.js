'use strict';

require([
    //Здесь подключаются зависимости, которе должны
    //будут попасть в сборку (которые нигде не подключены больше)
    'router',
    'jquery.validation',
    'google-analytics',
    'yandex-metrika'
], function (Router) {
    var App = {

        /**
         * @property
         * @name App.router
         * @type {blog.app.static.scripts.router|null}
         */
        router: null,

        /**
         * @method
         * @name App.initialize
         * @returns {undefined}
         */
        initialize: function () {
            //Инициализируем глобальную переменную
            window.Soshace = {
                errors: []
            };
            this.router = new Router();
        }
    };

    App.initialize();
});



