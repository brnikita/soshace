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
     * @return {undefined}
     */
    loginPostHandler: function () {
        var request = this.request,
            response = this.response,
            next = this.next,
            requestBody = request.body,
            userEmail = requestBody.email,
            _this = this;

        Passport.authenticate('local', function (error, user) {
            var locale;

            if (error) {
                _this.sendError(_this.i18n('Server is too busy, try later'));
                return;
            }

            if (!user) {
                _this.sendError(_this.i18n('User with email ') + userEmail + _this.i18n(' is not registered yet.'));
            }

            request.login(user._id, function (error) {
                if (error) {
                    _this.sendError(_this.i18n('Server is too busy, try later'));
                    return;
                }
                locale = user.locale;
                response.send({redirect: '/' + locale});
            });
        })(request, response, next);
    }
});