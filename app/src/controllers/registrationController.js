'use strict';
var _ = require('underscore'),
    RenderParams = require('../common/renderParams');
/**
 * Контроллер страницы регистрации
 *
 * @module RegistrationController
 */
var RegistrationController = {

    /**
     * Рендерим страницу регистрации
     *
     * @public
     * @function
     * @name RegistrationController.renderRegistration
     * @param {Object} request
     * @param {Object} response
     * @return {undefined}
     */
    renderRegistration: function (request, response) {
        var renderParams = new RenderParams(request);

        response.render('registrationView', _.extend(renderParams, {
            isSignUpPage: true,
            title: 'Registration page'
        }));
    }
};

module.exports = RegistrationController;