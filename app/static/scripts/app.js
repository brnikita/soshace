'use strict';

require([
    'jquery',
    'underscore',
    'handlebars',
    'backbone',
    'router',
    'utils/helpers',
    'modules/headerView',
    'utils/handlebarsHelpers',
    'backbone.layoutmanager',
    'config',
    'jquery.validation',
    'google-analytics',
    'yandex-metrika'
], function ($, _, Handlebars, Backbone, Router, Helpers, HeaderView) {
    var App = {

        /**
         * @property
         * @name App.router
         * @type {Backbone.Router | null}
         */
        router: null,

        /**
         * Экземпляр вид шапки
         *
         * @field
         * @name App.headerView
         * @type {Backbone.Layout | null}
          */
        headerView: null,

        /**
         * Список ссылкок на элемнты DOM
         *
         * @field
         * @name App.elements
         * @type {Object}
         */
        elements: {
            body: null,
            title: null
        },

        /**
         * @method
         * @name App.initialize
         * @returns {undefined}
         */
        initialize: function () {
            _.bindAll(this, 'routerLinkHandler');
            this.setElements();
            var $body = this.elements.body;
            this.headerView = new HeaderView();
            this.backboneLayoutConfigure();
            this.getCurrentLocale().done(_.bind(function () {
                $body.on('click', '.js-router-link', this.routerLinkHandler);
                this.router = new Router({
                    app: App
                });
            }, this));
        },

        /**
         * Метод сохраняет в поле elements ссылки на
         * элементы DOM
         *
         * @method
         * @name App.setElements
         * @returns {undefined}
         */
        setElements: function(){
            this.elements.body = $('body');
            this.elements.title = $('title');
        },

        /**
         * Метод настраивает конфигурацию Backbone.LayoutManager
         *
         * @method
         * @name App.backboneLayoutConfigure
         * @returns {undefined}
         */
        backboneLayoutConfigure: function () {
            Backbone.Layout.configure({
                /**
                 * @field
                 * @type {boolean}
                 */
                manage: false,

                /**
                 * @field
                 * @type {string}
                 */
                prefix: '/static/views/',

                /**
                 * Метод загружает партиал по пути
                 *
                 * @method
                 * @param {string} partialName имя партиала
                 * @returns {jQuery.Deferred}
                 */
                fetchPartial: function(partialName){
                    var deferred = $.Deferred(),
                        hbs = Soshace.hbs,
                        path;

                    path = this.prefix + 'partials/' + partialName + '.hbs';

                    if (hbs[path]) {
                        return deferred.resolve();
                    }

                    $.get(path, function (contents) {
                        debugger;
                        Handlebars.registerPartial(partialName, contents);
                        hbs[path] = contents;
                        deferred.resolve();
                    }, 'text');

                    return deferred;
                },

                /**
                 * @method
                 * @param {string} path путь до шаблона
                 * @returns {string | undefined}
                 */
                fetchTemplate: function (path) {
                    // Check for a global JST object.  When you build your templates for
                    // production, ensure they are all attached here.
                    var hbs = Soshace.hbs,
                        done;

                    path += '.hbs';

                    // If the path exists in the object, use it instead of fetching remotely.
                    if (hbs[path]) {
                        return hbs[path];
                    }

                    // If it does not exist in the JST object, mark this function as
                    // asynchronous.
                    done = this.async();

                    // Fetch via jQuery's GET.  The third argument specifies the dataType.
                    $.get(path, function (contents) {
                        var template = Handlebars.compile(contents);

                        hbs[path] = template;
                        done(template);
                    }, 'text');
                }
            });
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
                link = $target.closest('.js-router-link').attr('href');

            event.preventDefault();
            this.headerView.changeTab(link);
            Backbone.history.navigate(link, {trigger: true});
        },

        /**
         * Метод получает файлы перевода и записывает
         * в глобальную переменную Soshace.
         *
         * @method
         * @name App.getCurrentLocale
         * @returns {deferred}
         */
        getCurrentLocale: function () {
            var deferred = $.Deferred(),
                locale = Helpers.getLocale(),
                locales = Soshace.locales,
                localeUrl = Soshace.urls.locales + locale + '.json';

            if (typeof locales[locale] !== 'undefined') {
                return deferred.resolve(locales[locale]);
            }

            $.get(localeUrl, function (data) {
                locales[locale] = data;
                deferred.resolve(data);
            }, 'json');

            return deferred;
        }
    };

    App.initialize();
});



