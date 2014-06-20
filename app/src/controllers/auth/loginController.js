'use strict';
var _ = require('underscore'),
    ControllerInit = require('../../common/controllerInit'),
    RenderParams = require('../../common/renderParams'),
    Passport = require('passport');

/**
 * Контроллер страницы регистрации
 *
 * @class LoginController
 */
module.exports = ControllerInit.extend({

    /**
     * Рендерим страницу регистрации
     *
     * @public
     * @function
     * @name LoginController#renderLogin
     * @return {undefined}
     */
    renderLogin: function () {
        var request = this.request,
            response = this.response,
            renderParams = new RenderParams(request);

        response.render('auth/authView', _.extend(renderParams, {
            isAuthPage: true,
            isLoginTab: true,
            title: 'Registration page',
            bodyClass: 'bg-color-yellow bg-symbols'
        }));
    },

    /**
     * Обработчик запроса аворизации со страницы логина
     *
     * @private
     * @function
     * @name LoginController.loginPostHandler
     * @param request
     * @param response
     * @param next
     * @return {undefined}
     */
    loginPostHandler: function (request, response, next) {
        var _this = this;

        Passport.authenticate('local', function (error, user, info) {
            var message;

            if (error) {
                message = 'Something is wrong, please try again!';
                response.send({error: true, message: _this.i18n(message)});
                return;
            }

            if (!user) {
                if (typeof info.message.email !== 'undefined') {
                    message = this.i18n('Email') + ' ' + info.message.email + ' ' +
                        this.i18n(info.message.text);
                    response.send({error: true, message: message});
                    return;
                }

                if (typeof info.message.text !== 'undefined') {
                    message = info.message.text;
                    response.send({error: true, message: _this.i18n(message)});
                    return;
                }
            }

            request.logIn(user, function (error) {
                if (error) {
                    message = 'Something is wrong, please try again!';
                    response.send({error: true, message: _this.i18n(message)});
                    return;
                }

                response.send({redirect: '/'});
            });
        })(request, response, next);
    }
});