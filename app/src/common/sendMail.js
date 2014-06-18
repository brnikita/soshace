'use strict';

var _ = require('underscore'),
    Handlebars = require('express3-handlebars').create(),
    RenderParams = require('./renderParams');

/**
 * Модуль отправки сообщений
 * noreply@soshace.com
 */
var NodeMailer = require('nodemailer'),
    transport = NodeMailer.createTransport('SMTP', {
        service: Soshace.MAIL_SERVICE,
        auth: {
            user: Soshace.MAIL_NO_REPLY,
            pass: Soshace.MAIL_NO_REPLY_PASSWORD
        }
    });

var SendMail = {
    /**
     * Метод возвращает ссылку для подтверждения email
     *
     * @method
     * @name SendMail.getConfirmationLink
     * @param {string} code
     * @returns {string}
     */
    getConfirmationLink: function(code){
        var host = Soshace.LOCAL_MACHINE ? Soshace.LOCAL_HOST : Soshace.PRODUCTION_HOST;
        return 'http://' + host + '/registration/confirm-email?code=' + code;
    },

    /**
     * Отправляем письмо подтверждения аккаунта
     *
     * @function
     * @name SendMail.sendConfirmMail
     * @param {String} request
     * @param {String} user модель пользователя
     * @return {undefined}
     */
    sendConfirmMail: function (request, user) {
        var renderParams = new RenderParams(request),
            mailTemplatePath = Soshace.DIR_NAME + '/app/views/mails/confirmationMailView.hbs',
            confirmationLink = this.getConfirmationLink(user.confirmCode);

        Handlebars.render(mailTemplatePath, _.extend(renderParams,{
            host: Soshace.PRODUCTION_HOST,
            fullName: user.fullName,
            emailConfirmLink: confirmationLink
        }), function (error, template) {
            transport.sendMail({
                from: Soshace.MAIL_NO_REPLY,
                to: user.email,
                subject: 'Confirmation message',
                html: template
            });
        });
    }
};

_.bindAll(SendMail, 'sendConfirmMail');
module.exports = SendMail;