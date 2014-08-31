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
            var userName = this.get('userName');
            return Soshace.urls.api.user.replace('0', userName);
        },

        /**
         * @property
         * @name UserModel#defaults
         * @type {Object}
         */
        defaults: {
            userName: null,
            locale: null,
            fullName: null,
            profileImg: null,
            sex: null,
            birthday: null,
            aboutAuthor: null
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

            return this.fetch();
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