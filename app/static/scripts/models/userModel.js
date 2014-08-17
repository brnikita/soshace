'use strict';

/**
 * Модель страницы пользователя
 *
 * @class UserModel
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'utils/helpers',
    'config'
], function ($, _, Backbone, Helpers) {
    return Backbone.Model.extend({
        
        /**
         * @field
         * @name UserModel#idAttribute
         * @type {String}
         */
        idAttribute: 'username',
        
        /**
         * @method
         * @name UserModel#initialize
         * @returns {string}
         */
        url: function(){
            var username = this.get('username');
            return Soshace.urls.api.user.replace('0', username);
        },

        /**
         * @property
         * @name UserModel#defaults
         * @type {Object}
         */
        defaults: {
            username: null,
            locale: null,
            fullName: null,
            profileImg: null,
            posts: null,
            isMale: null
        },

        /**
         * Метод загружает данные пользователя
         *
         * @method
         * @name UserModel#getUser
         * @returns {jQuery.Deferred}
         */
        getUser: function () {
            var deferred = $.Deferred(),
                userName = this.get('userName'),
                profileUserName = '',
                profile = Soshace.profile;

            if (profile !== null) {
                profileUserName = profile.userName;

                if (profileUserName === userName) {
                    this.set(profile);
                    return deferred.resolve(profile);
                }
            }

            return $.get(Soshace.urls.api.user, {userName: userName});
        },

        /**
         * @constructor
         * @name UserModel#initialize
         * @returns {undefined}
         */
        initialize: function () {
            var locale = Helpers.getLocale();
            this.set({locale: locale}, {silent: true});
        }
    });
});