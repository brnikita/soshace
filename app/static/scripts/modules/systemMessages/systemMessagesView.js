'use strict';

/**
 * Вид блока системных уведомлений
 *
 * @class SystemMessagesView
 */

define([
    'jquery',
    'underscore',
    'backbone',
    './systemMessagesCollection',
    'backbone.layoutmanager'
], function ($, _, Backbone, SystemMessagesCollection) {
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
         * @returns {undefined}
         */
        initialize: function () {
            this.collection = new SystemMessagesCollection();
        },

        /**
         * Метод возвращает модель первого доступного
         * сообщения для показа на данной странице
         *
         * @method
         * @name RegistrationView#getFirsAvailableMessage
         * @param {String} pageAlias сокращенное название страницы
         * @returns {undefined}
         */
        getFirsAvailableMessage: function(pageAlias){
            var collection = this.collection.toJSON();

            return _.find(collection, function(model){
                return _.indexOf(model.pages, pageAlias) !== -1;
            });
        },

        /**
         * Метод обработчик смены страницы
         *
         * @method
         * @name RegistrationView#changePage
         * @param {String} pageAlias сокращенное название страницы
         * @returns {undefined}
         */
        changePage: function(pageAlias){
           this.model = this.getFirsAvailableMessage(pageAlias);

            if(this.model){
                
            }
        },

        /**
         * @method
         * @name RegistrationView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
        }
    });
});