'use strict';

(function (Soshace) {
    var _ = Soshace._;

    Soshace.core.App = Soshace.core.View.extend({

        /**
         * @field
         * @name Soshace.core.App#router
         * @type {Soshace.core.Router | null}
         */
        router: null,

        /**
         * Коллекция системных сообщений
         *
         * @field
         * @name Soshace.core.App#systemMessagesCollection
         * @type {Soshace.collections.SystemMessagesCollection | null}
         */
        systemMessagesCollection: null,

        /**
         * @field
         * @name Soshace.core.App#el
         * @type {string}
         */
        el: 'body',

        /**
         * Список ссылкок на элемнты DOM
         *
         * @field
         * @name Soshace.core.App#elements
         * @type {Object}
         */
        elements: {
            title: null,
            contentFirstLoad: null
        },

        /**
         * @constructor
         * @name Soshace.core.App#initialize
         * @returns {undefined}
         */
        initialize: function () {
            this.systemMessagesCollection = new Soshace.collections.SystemMessagesCollection();
            this.getCommonData().done(_.bind(this.initializeCompleted, this));
        },

        /**
         * Метод обработчик заврешения инициализации приложения
         * Когда загружается все необходимы польховательские данные
         *
         * @method
         * @name Soshace.core.App#initializeCompleted
         * @returns {undefined}
         */
        initializeCompleted: function () {
            var _this = this;

            this.setElements();
            this.setView('.js-header', new Soshace.Views.HeaderView());
            this.setView('.js-system-messages', new Soshace.views.SystemMessagesView({
                collection: _this.systemMessagesCollection
            }));
            this.$el.on('click', '.js-router-link', _.bind(this.routerLinkHandler, this));
            this.router = new Soshace.core.Router();
        },

        /**
         * Метод получает все необходимые данные для запуска
         * приложения
         *
         * Такие как: локали, данные профиля пользователя
         *
         * @method
         * @name Soshace.core.App#getCommonData
         * @returns {Deferred}
         */
        getCommonData: function () {
            return Soshace.core.Deferred.when(
                this.getCurrentLocale(),
                this.getProfileData(),
                this.getSystemMessages()
            );
        },

        /**
         * Метод сохраняет в поле elements ссылки на
         * элементы DOM
         *
         * @method
         * @name Soshace.core.App#setElements
         * @returns {undefined}
         */
        setElements: function () {
            this.elements.title = Soshace.core.$('title');
            this.elements.contentFirstLoad = Soshace.core.$('.js-content-first-load');
        },

        /**
         * Метод обработчик клика на ссылки предназначенные для
         * роутера
         *
         * @method
         * @name Soshace.core.App#routerLinkHandler
         * @param {jQuery.Event} event
         * @returns {undefined}
         */
        routerLinkHandler: function (event) {
            var $target = Soshace.core.$(event.target),
                link = $target.closest('.js-router-link').attr('href');

            if (Soshace.Helpers.checkHistoryApiSupport()) {
                event.preventDefault();
                Soshace.core.app.history.navigate(link, {trigger: true});
            }
        },

        /**
         * Метод получает системные сообщения
         *
         * @method
         * @name Soshace.core.App#getSystemMessages
         * @returns {undefined}
         */
        getSystemMessages: function () {
            return this.systemMessagesCollection.fetch();
        },

        /**
         * Метод получает данные профиля пользователя
         *
         * Возвращает деферред объект
         *
         * @method
         * @name Soshace.core.App#getProfileData
         * @returns {Deferred}
         */
        getProfileData: function (profileUserName) {
            var profileUrl,
                deferred = Soshace.core.deferred();

            if (!Soshace.helpers.isAuthenticated()) {
                return deferred.resolve(null);
            }

            if (Soshace.profile !== null) {
                return deferred.resolve(Soshace.profile);
            }

            profileUserName = Soshace.helpers.getCookie('profileUserName');
            profileUrl = Soshace.urls.api.user.replace('0', profileUserName);
            Soshace.core.get(profileUrl).done(function (data) {
                Soshace.profile = data;
                deferred.resolve(data);
            });

            return deferred;
        },

        /**
         * Метод получает файлы перевода и записывает
         * в глобальную переменную Soshace.
         *
         * @method
         * @name Soshace.core.App#getCurrentLocale
         * @returns {Deferred}
         */
        getCurrentLocale: function () {
            var deferred = Soshace.core.deferred(),
                locale = Soshace.helpers.getLocale(),
                locales = Soshace.locales,
                localeUrl = Soshace.urls.locales + locale + '.json';

            if (locale === 'en') {
                return deferred.resolve({});
            }

            if (typeof locales[locale] !== 'undefined') {
                return deferred.resolve(locales[locale]);
            }

            Soshace.core.get(localeUrl).done(function (data) {
                locales[locale] = data;
                deferred.resolve(data);
            });

            return deferred;
        }
    });

    Soshace.app = new Soshace.core.App();

})(window.Soshace);



