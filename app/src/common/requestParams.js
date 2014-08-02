'use strict';

/**
 * Модуль возвращает переменные, зависисмые от запроса и
 * переменные общие для шаблонов
 *
 * @constructor
 * @name requestParams
 * @param {Object} request
 * @returns {Object}
 */
module.exports = function (request) {
    var HandlebarsHelpers = require('./handlebarsHelpers'),
        helpers = new HandlebarsHelpers(request),
        profile = request.user && request.user[0],
        profileUserName = profile && profile.userName;

    return {
        isProduction: Soshace.IS_PRODUCTION,
        version: Soshace.VERSION,
        helpers: helpers,
        bodyClass: 'bg-color-green bg-symbols',
        locale: request.i18n.getLocale(),
        isAuthenticated: request.isAuthenticated(),
        paths: Soshace.PATHS,
        profile: profile,
        profileUserName: profileUserName,
        //для шаблонов
        backend: true
    };
};