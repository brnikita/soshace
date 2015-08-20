'use strict';

var _ = require('underscore'),
    Controller = srcRequire('common/controller'),
    UsersModel = srcRequire('models/usersModel'),
    PasswordResetModel = srcRequire('models/resetPasswordModel'),
    RequestParams = srcRequire('common/requestParams'),
    SendMail = srcRequire('common/sendMail'),
    Helpers = srcRequire('common/helpers'),
    Passport = require('passport'),
    LoginController = srcRequire('controllers/auth/loginController')
    ;

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
     * @name RemindPasswordController#renderRemindPasswordPage
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
     * Renders a page for password resetting
     *
     * @public
     * @function
     * @name RemindPasswordController#resetPassword
     * @return {undefined}
     */
    resetPassword: function () {
        var request = this.request,
            response = this.response,
            requestParams = new RequestParams(request),
            code = request.query.code,
            now = new Date(),
            MS_PER_DAY = 1000 * 60 * 60 * 24,
            TWO_DAYS = MS_PER_DAY * 2,
            self = this
            ;
        now = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());
        PasswordResetModel.findOne({code: code}, function (error, resetCode) {
            if (error) {
                self.renderError('Page not found', 404);
                console.log(error);
                return;
            }

            if (!resetCode) {
                self.renderError('Page not found', 404);
                return;
            }
            var timestamp = resetCode.timestamp;
            timestamp = Date.UTC(timestamp.getFullYear(), timestamp.getMonth(), timestamp.getDate());

            if (now - timestamp > TWO_DAYS) {
                self.renderError('Reset code outdated', 410);
                return;
            }

            UsersModel.findOne({_id: resetCode.userId}, function (error, user) {
                response.render('auth/remindPasswordSuccess', _.extend(requestParams, {
                    title: 'Reset password',
                    token: code,
                    email: user.email
                }));
            });

        });

    },

    /**
     * Changes a password
     *
     * @public
     * @function
     * @name RemindPasswordController#changePassword
     * @return {undefined}
     */

    changePassword: function () {
        var request = this.request,
            response = this.response,
            body = request.body,
            MS_PER_DAY = 1000 * 60 * 60 * 24,
            TWO_DAYS = MS_PER_DAY * 2,
            now = new Date(),
            self = this;
        PasswordResetModel.findOne({code: body.token}, function (error, resetCode) {
            if (error) {
                self.renderError('Page not found', 404);
                console.log(error);
                return;
            }

            if (!resetCode) {
                self.renderError('Page not found', 404);
                return;
            }

            var timestamp = resetCode.timestamp;
            timestamp = Date.UTC(timestamp.getFullYear(), timestamp.getMonth(), timestamp.getDate());

            if (now - timestamp > TWO_DAYS) {
                self.renderError('Reset code outdated', 410);
                return;
            }

            UsersModel.findOneAndUpdatePassword(resetCode.userId, body.password);
            response.send({success: true});
            Passport.authenticate('local', LoginController.authenticateHandler)(request, response, function() {});
        });

    },

    /**
     * Method validates email field
     *
     * @method
     * @name RemindPasswordController#validateField
     * @param {string} fieldValue
     * @param {Function} callback
     * @returns {undefined}
     */
    validateField: function (fieldValue, callback) {
        var user = new UsersModel({
                email: fieldValue
            }),
            request = this.request,
            time = String((new Date()).getTime()),
            code = Helpers.encodeMd5(time+fieldValue)
            ;

        UsersModel.findOne({email: fieldValue}, function (error, user) {
            console.log(user);
            PasswordResetModel.update({userId: user.id}, {code: code, userId: user.id, timestamp: new Date()}, {upsert: true}, function (error) {
                console.log(error);
            });
        });

        user.emailExists(fieldValue);
        //code = user.updatePasswordResetCode(fieldValue);
        SendMail.sendPasswordResetMail(request, user, code);

    },

    /**
     * Method handles request with email for password repairing
     *
     * @public
     * @method
     * @name RemindPasswordController#remindPasswordHandler
     * @returns {undefined}
     */
    remindPasswordHandler: function () {
        var request = this.request,
            requestBody = request.body,
            emailValue = requestBody.email;
        console.log('remindPasswordhandler')
        this.validateField(emailValue, function (error) {
            console.log(error);
        });
    }
});