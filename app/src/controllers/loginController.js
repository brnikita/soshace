'use strict';
var _ = require('underscore'),
    RenderParams = require('../common/renderParams');
/**
 * Контроллер страницы регистрации
 *
 * @module LoginController
 */
var LoginController = {

    /**
     * Рендерим страницу регистрации
     *
     * @public
     * @function
     * @name LoginController.renderLogin
     * @param {Object} request
     * @param {Object} response
     * @return {undefined}
     */
    renderLogin: function (request, response) {
        var renderParams = new RenderParams(request);

        response.render('loginView', _.extend(renderParams, {
            isSignInPage: true,
            title: 'Registration page',
            bodyClass: 'bg-books'
        }));
    }
};

module.exports = LoginController;