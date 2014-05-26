'use strict';
var _ = require('underscore'),
    RenderParams = require('../common/renderParams');
/**
 * Контроллер страницы профиля пользователя
 *
 * @module UserController
 */
var UserController = {

    /**
     * Метод рендерит страницу пользователя
     *
     * @method
     * @name UserController.renderLogin
     * @param {Object} request
     * @param {Object} response
     * @return {undefined}
     */
    renderUserPage: function (request, response) {
        var renderParams = new RenderParams(request);

        response.render('userView', _.extend(renderParams, {
            isUserPage: true,
            title: 'User page',
            bodyClass: 'bg-color-blue bg-symbols'
        }));
    }
};

module.exports = UserController;