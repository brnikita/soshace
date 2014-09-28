'use strict';

(function (Soshace) {
    /**
     * Модель страницы логина
     *
     * @class Soshace.models.LoginModel
     */
    Soshace.models.LoginModel = Soshace.core.Model.extend({
        /**
         * @property
         * @name Soshace.models.LoginModel#defaults
         * @type {Object}
         */
        defaults: {
            locale: null,
            email: null,
            password: null
        },

        /**
         * @field
         * @name RegistrationModel#validation
         * @type {Object}
         */
        validation: {
            email: [
                {
                    required: true,
                    msg: 'Email can&#39;t be blank.'
                },
                {
                    pattern: Soshace.patterns.email,
                    msg: 'Email is invalid.'
                }
            ],
            password: [
                {
                    required: true,
                    msg: 'Password can&#39;t be blank.'
                },
                {
                    minLength: 6,
                    msg: 'Password length should&#39;t be less than 6 characters.'
                }
            ]
        },

        /**
         * @field
         * @name Soshace.models.LoginModel#url
         * @type {string}
         */
        url: Soshace.urls.api.login,

        /**
         * @constructor
         * @name Soshace.models.LoginModel#initialize
         * @returns {undefined}
         */
        initialize: function () {
            var locale = Soshace.helpers.getLocale();
            this.set({locale: locale}, {silent: true});
        }
    });
})(window.Soshace);