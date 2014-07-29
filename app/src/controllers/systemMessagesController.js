'use strict';

var Controller = require('../common/controller'),
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
     * Метод возврвщает все системные сообщения для
     * профиля пользователя
     *
     * @method
     * @name SystemMessagesController#getMessages
     * @returns {undefined}
     */
    getMessages: function(){
        var request = this.request,
            response = this.response,
            requestParams = new RequestParams(request),
            isAuthenticated = requestParams.isAuthenticated,
            profile = requestParams.profile;

        if(!isAuthenticated){
            this.sendError('User is not authorized.', 401);
            return;
        }

        SystemMessagesModel.getMessages(profile._id, function(error, messssages){
            if(error){
                response.sendError(error);
                return;
            }

            response.send({results: messssages});
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
    deleteMessage: function(alias){

    },

    /**
     * @method
     * @name SystemMessagesController#updateMessage
     * @returns {undefined}
     */
    updateMessage: function(){

    }
});