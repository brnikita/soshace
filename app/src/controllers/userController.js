'use strict';
var ControllerInit = require('../common/controllerInit'),
    _ = require('underscore'),
    RenderParams = require('../common/renderParams');
/**
 * Контроллер страницы профиля пользователя
 *
 * @class UserController
 */
module.exports = ControllerInit.extend({

    /**
     * Метод рендерит страницу пользователя
     *
     * @method
     * @name UserController#renderLogin
     * @return {undefined}
     */
    renderUserPage: function () {
        var request = this.request,
            response = this.response,
            renderParams = new RenderParams(request);

        response.render('userView', _.extend(renderParams, {
            isUserPage: true,
            title: 'User Profile',
            bodyClass: 'bg-color-blue bg-symbols'
        }));
    }
});