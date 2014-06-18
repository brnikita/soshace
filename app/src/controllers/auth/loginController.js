'use strict';
var _ = require('underscore'),
    ControllerInit = require('../../common/controllerInit'),
    RenderParams = require('../../common/renderParams');
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
    }
});