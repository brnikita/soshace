'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'utils/helpers',
    'utils/widgets',
    'modules/headerView',
    'backbone.layoutmanager'
], function ($, _, Backbone, Router, Helpers, Widgets, HeaderView) {
    var App = Backbone.Layout.extend({

        /**
         * @property
         * @name App#router
         * @type {Backbone.Router | null}
         */
        router: null,

        /**
         * @field
         * @name App#el
         * @type {String}
         */
        el: 'body',

        /**
         * Список ссылкок на элемнты DOM
         *
         * @field
         * @name App#elements
         * @type {Object}
         */
        elements: {
            title: null
        },

        /**
         * @constructor
         * @name App#initialize
         * @returns {undefined}
         */
        initialize: function () {
            _.bindAll(this, 'routerLinkHandler', 'initializeCompleted');
            this.setElements();
            this.setView('.js-header', new HeaderView({
                app: this
            }));
            this.getCommonData().done(this.initializeCompleted);
        },

        /**
         * Метод вовзращает true, если есть профиль
         * аутентифицированного пользователя
         *
         * @method
         * @name App#isAuthenticated
         * @returns {Boolean}
         */
        isAuthenticated: function () {
            var profile = Soshace.profile;
            return !!(profile && typeof profile.userName === 'string' &&
                profile.userName.length > 0);
        },

        /**
         * Метод обработчик заврешения инициализации приложения
         * Когда загружается все необходимы польховательские данные
         *
         * @method
         * @name App#initializeCompleted
         * @returns {undefined}
         */
        initializeCompleted: function () {
            Widgets.hideLoader();
            this.$el.on('click', '.js-router-link', this.routerLinkHandler);
            this.router = new Router({
                app: this
            });
        },

        /**
         * Метод получает все необходимые данные для запуска
         * приложения
         *
         * Такие как: локали, данные профиля пользователя
         *
         * @method
         * @name App#getCommonData
         * @returns {jQuery.Deferred}
         */
        getCommonData: function () {
            return $.when(
                this.getCurrentLocale(),
                this.getProfileData()
            );
        },

        /**
         * Метод сохраняет в поле elements ссылки на
         * элементы DOM
         *
         * @method
         * @name App#setElements
         * @returns {undefined}
         */
        setElements: function () {
            this.elements.title = $('title');
        },

        /**
         * Метод обработчик клика на ссылки предназначенные для
         * роутера
         *
         * @method
         * @name App#routerLinkHandler
         * @param {jQuery.Event} event
         * @returns {undefined}
         */
        routerLinkHandler: function (event) {
            var $target = $(event.target),
                link = $target.closest('.js-router-link').attr('href');

            if (Helpers.checkHistoryApiSupport) {
                event.preventDefault();
                Backbone.history.navigate(link, {trigger: true});
            }
        },

        /**
         * Метод получает данные профиля пользователя
         *
         * Возвращает деферред объект
         *
         * @method
         * @name App#getProfileData
         * @returns {jQuery.Deferred}
         */
        getProfileData: function () {
            var deferred = $.Deferred();

            if (Soshace.profile !== null) {
                return deferred.resolve(Soshace.profile);
            }

            $.get(Soshace.urls.api.profile, function (data) {
                var profileData = data.profile;

                Soshace.profile = profileData;
                deferred.resolve(profileData);
            }, 'json');

            return deferred;
        },

        /**
         * Метод получает файлы перевода и записывает
         * в глобальную переменную Soshace.
         *
         * @method
         * @name App#getCurrentLocale
         * @returns {deferred}
         */
        getCurrentLocale: function () {
            var deferred = $.Deferred(),
                locale = Helpers.getLocale(),
                locales = Soshace.locales,
                localeUrl = Soshace.urls.locales + locale + '.json';

            if (locale === 'en') {
                return deferred.resolve({});
            }

            if (typeof locales[locale] !== 'undefined') {
                return deferred.resolve(locales[locale]);
            }

            $.get(localeUrl, function (data) {
                locales[locale] = data;
                deferred.resolve(data);
            }, 'json');

            return deferred;
        }
    });

    Soshace.app = new App();
});



