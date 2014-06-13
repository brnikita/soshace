'use strict';

var Handlebars = require('express3-handlebars').create();

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
     * @method
     * @name SendMail.getConfirmationLink
     * @param {string} code
     * @returns {string}
     */
    getConfirmationLink: function(code){
        var host = Soshace.LOCAL_MACHINE ? Soshace.LOCAL_HOST : Soshace.PRODUCTION_HOST,
        port =  Soshace.LOCAL_MACHINE ?  ':' + Soshace.LOCAL_PORT : '',
        emailConfirmLink = 'http://' + host + port + '/registration/confirm-email?code=' + code;
    },

    /**
     * Отправляем письмо подтверждения аккаунта
     *
     * @private
     * @function
     * @name SendMail.sendConfirmMail
     * @param {String} mail
     * @param {Object} user
     * @param {Object} i18n объект, содержащий методы для работы с переводами
     * @return {undefined}
     */
    sendConfirmMail: function (mail, user, i18n) {
        var mailTemplatePath = '../views/mails/confirmMailView.hbs';

        Handlebars.render(mailTemplatePath, {user: user, i18n: i18n}, function (template) {
            transport.sendMail({
                from: Soshace.MAIL_NO_REPLY,
                to: mail,
                subject: 'Confirmation message',
                html: template
            });
        });
    }
};

_.bindAll(SendMail, 'sendConfirmMail');
module.exports = SendMail;