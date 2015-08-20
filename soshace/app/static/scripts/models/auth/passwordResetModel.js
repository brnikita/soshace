'use strict';

/**
 * Reset password page model
 *
 * @module LoginModel
 */

define([
    'zepto',
    'underscore',
    'backbone',
    'utils/helpers',
    'config'
], function ($, _, Backbone, Helpers) {
    return Backbone.Model.extend({
        /**
         * @property
         * @name LoginModel#defaults
         * @type {Object}
         */
        defaults: {
            locale: null,
            password: null,
            confirmPassword: null,
            token: null
        },

        /**
         * @field
         * @name LoginModel#validation
         * @type {Object}
         */
        validation: {
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
            //confirmPassword: [
            //    {
            //        required: true,
            //        msg: 'Password can&#39;t be blank.'
            //    },
            //    {
            //        minLength: 6,
            //        msg: 'Password length should&#39;t be less than 6 characters.'
            //    }
            //]
        },

        url: Soshace.urls.api.resetPassword,
        /**
         * @constructor
         * @name LoginModel#initialize
         * @returns {undefined}
         */
        initialize: function () {
            var locale = Helpers.getLocale();
            this.set({locale: locale}, {silent: true});
        }
    });
});