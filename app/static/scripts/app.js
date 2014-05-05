'use strict';

require([
    //Здесь подключаются зависимости, которе должны
    //будут попасть в сборку (которые нигде не подключены больше)
    'jquery',
    'underscore',
    'backbone',
    'router',
    'config',
    'jquery.validation',
    'google-analytics',
    'yandex-metrika'
], function ($, _, Backbone, Router) {
    var App = {

        /**
         * @property
         * @name App.router
         * @type {Backbone.Router | null}
         */
        router: null,

        /**
         * @method
         * @name App.initialize
         * @returns {undefined}
         */
        initialize: function () {
            _.bindAll(this, 'routerLinkHandler');
            $('body').on('click', '.js-router-link', this.routerLinkHandler);
            this.router = new Router();
        },

        /**
         * Метод обработчик клика на ссылки предназначенные для
         * роутера
         *
         * @method
         * @name App.routerLinkHandler
         * @param {jQuery.Event} event
         * @returns {undefined}
         */
        routerLinkHandler: function (event) {
            var $target = $(event.target),
                link = $target.attr('href');

            event.preventDefault();
            this.router.navigate(link, {trigger: true});
        }
    };

    App.initialize();
});



