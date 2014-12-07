'use strict';

var _ = require('underscore'),
    Controller = srcRequire('common/controller'),
    UsersModel = srcRequire('models/usersModel'),
    RequestParams = srcRequire('common/requestParams');

/**
 * Controller of remind password page
 *
 * @class RemindPasswordController
 */
module.exports = Controller.extend({
    /**
     * Method renders remind password page
     *
     * @public
     * @function
     * @name RegistrationController#renderRemindPasswordPage
     * @return {undefined}
     */
    renderRemindPasswordPage: function () {
        var request = this.request,
            response = this.response,
            requestParams = new RequestParams(request),
            locale,
            profileUserName;

        if (requestParams.isAuthenticated) {
            locale = requestParams.locale;
            profileUserName = requestParams.profileUserName;
            response.redirect('/' + locale + '/users/' + profileUserName);
            return;
        }

        response.render('auth/remindPassword', _.extend(requestParams, {
            title: 'Remind password page'
        }));
    },

    /**
     * Метод валидирует поля регистрации
     *
     * @method
     * @name RegistrationController#validateField
     * @returns {undefined}
     */
    validateField: function () {
        var request = this.request,
            response = this.response,
            requestData = request.body,
            fieldName = _.keys(requestData)[0],
            user = new UsersModel(requestData);

        //TODO: добавить проверку на наличие поля в модели
        user.validate(_.bind(function (error) {
            var errors = error && error.errors,
                errorMessage = errors && errors[fieldName] || null;

            if (errorMessage) {
                this.sendError({error: errorMessage});
                return;
            }

            response.send({error: null});
        }, this));
    }
});