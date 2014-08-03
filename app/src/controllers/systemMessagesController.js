'use strict';

var _ = require('underscore'),
    Controller = require('../common/controller'),
    RequestParams = require('../common/requestParams'),
    SystemMessagesModel = require('../models/systemMessagesModel');

/**
 * Контроллер, отвечающий за работу с системными сообщениями
 *
 * @class SystemMessagesController
 *
 */
module.exports = Controller.extend({

    /**
     * Метод устанавливает сообщения для незарегистрированных
     * пользователей
     *
     * @method
     * @name SystemMessagesController#initialize
     * 2returns {undefined}
     */
    setCommonMessages: function () {
        SystemMessagesModel.getMessages({notAuthenticated: true}, function (error, messages) {
            if (error) {
                return;
            }

            if (messages.length) {
                return;
            }

            var successConfirmEmail = new SystemMessagesModel({
                alias: 'enableEditor',
                ownerId: null,
                templatePath: 'messages/enableEditor',
                notAuthenticated: true,
                pages: ['addPost']
            });

            successConfirmEmail.save();
        });
    },

    /**
     * Метод отправляет сообщения для незарегистрированных пользователей
     *
     * @method
     * @name SystemMessagesController#sendCommonMessages
     * @returns {undefined}
     */
    sendCommonMessages: function () {
        var response = this.response;

        SystemMessagesModel.getMessages({notAuthenticated: true}, _.bind(function (error, messages) {
            if (error) {
                this.sendError(error);
                return;
            }

            response.send({results: messages});
        }, this));
    },

    /**
     * Метод возврвщает все системные сообщения для
     * профиля пользователя
     *
     * @method
     * @name SystemMessagesController#getMessages
     * @returns {undefined}
     */
    getMessages: function () {
        var request = this.request,
            response = this.response,
            requestParams = new RequestParams(request),
            isAuthenticated = requestParams.isAuthenticated,
            profile = requestParams.profile;

        if (!isAuthenticated) {
            this.sendCommonMessages();
            return;
        }

        SystemMessagesModel.getMessages({ownerId: profile._id}, function (error, messages) {
            if (error) {
                response.sendError(error);
                return;
            }

            response.send({results: messages});
        });
    },

    /**
     * Метод удаляет сообщение по алиасу,
     * относящееся к профилю пользователя
     *
     * @method
     * @name SystemMessagesController#deleteMessage
     * @param {String} alias
     * @returns {undefined}
     */
    deleteMessage: function () {

    },

    /**
     * @method
     * @name SystemMessagesController#updateMessage
     * @returns {undefined}
     */
    updateMessage: function () {

    }
});