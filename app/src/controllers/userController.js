'use strict';
var Controller = require('../common/controller'),
    _ = require('underscore'),
    RenderParams = require('../common/renderParams');
/**
 * Контроллер страницы профиля пользователя
 *
 * @class UserController
 */
module.exports = Controller.extend({

    /**
     * Метод отдает в ответе json с данными профиля
     * пользователя
     *
     * @method
     * @name UserController#getUser
     * @returns {undefined}
     */
    getUser: function () {

    },

    /**
     * Метод отдает в ответе json с данными профиля
     * текущего авторизованного пользователя
     *
     * @method
     * @name UserController#getProfile
     * @returns {undefined}
     */
    getProfile: function () {
        var request = this.request,
            response = this.response,
            userProfile = null;

        if (request.user && request.user[0]) {
            userProfile = _.pick(request.user[0],
                'fullName',
                'userName',
                'isMale',
                'admin',
                'emailConfirmed',
                'systemMessages',
                'locale');
        }

        response.send({
            profile: userProfile
        });
    },

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
            isUserTab: true,
            title: 'User Profile',
            bodyClass: 'bg-color-blue bg-symbols'
        }));
    }
});