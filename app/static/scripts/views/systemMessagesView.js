'use strict';

/**
 * Вид блока системных уведомлений
 *
 * @class SystemMessagesView
 */

define([
    'zepto',
    'plugins/underscoreSmall',
    'backbone',
    'backbone.layoutmanager',
    'templates'
], function ($, _, Backbone) {
    return Backbone.Layout.extend({

        /**
         * @field
         * @name RegistrationView#collection
         * @type {SystemMessagesCollection | null}
         */
        collection: null,

        /**
         * Модель подходящего системного сообщения
         *
         * @field
         * @name RegistrationView#model
         * @type {Backbone.Model | null}
         */
        model: null,

        /**
         * @field
         * @name RegistrationView#elements
         * @type {Object}
         */
        elements: {
        },

        /**
         * Список обработчиков событий
         *
         * @field
         * @name RegistrationView#events
         * @type {Object}
         */
        events: {
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name RegistrationView#template
         * @type {string}
         */
        template: Soshace.hbs['auth/authView'],

        /**
         * @constructor
         * @name RegistrationView#initialize
         * @param {Object} params
         * @returns {undefined}
         */
        initialize: function (params) {
            this.collection = params.collection;
            this.collection.on('sync', this.saveMessagesGlobal, this);
        },

        /**
         * Метод сохраняет системные сообщения в глобальной переменной
         * Soshace.systemMessages
         *
         * @method
         * @name RegistrationView#saveMessagesGlobal
         * @returns {undefined}
         */
        saveMessagesGlobal: function () {
            Soshace.systemMessages = this.collection.toJSON();
        },

        /**
         * Метод возвращает модель первого доступного
         * сообщения для показа на данной странице
         *
         * @method
         * @name RegistrationView#getFirsAvailableMessage
         * @param {string} pageAlias сокращенное название страницы
         * @returns {Backbone.Model}
         */
        getFirsAvailableMessage: function (pageAlias) {
            return this.collection.find(function (model) {
                return _.indexOf(model.get('pages'), pageAlias) !== -1;
            });
        },

        /**
         * Метод проверяет системное сообщение на наличие флага
         * showOnce - показ только один раз
         *
         * @method
         * @name RegistrationView#checkShowOnceFlag
         * @returns {undefined}
         */
        checkShowOnceFlag: function () {
            if (this.model.get('showOnce')) {
                this.model.destroy();
            }
        },

        /**
         * Метод обработчик смены страницы
         *
         * @method
         * @name RegistrationView#changePage
         * @param {string} pageAlias сокращенное название страницы
         * @returns {undefined}
         */
        changePage: function (pageAlias) {
            var templatePath;
            this.model = this.getFirsAvailableMessage(pageAlias);

            if (this.model) {
                templatePath = this.model.get('templatePath');
                this.template = Soshace.hbs[templatePath];
                this.render();
                return;
            }

            this.$el.empty();
        },

        /**
         * @method
         * @name RegistrationView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
            this.checkShowOnceFlag();
        }
    });
});