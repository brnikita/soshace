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
    var profile = request.user && request.user[0],
        profileUserName = profile && profile.userName,
        isProduction = Soshace.IS_PRODUCTION,
        localHost = Soshace.LOCAL_HOST,
        productionHost = Soshace.PRODUCTION_HOST,
        host = isProduction ? productionHost : localHost,
        scriptsList = isProduction ? [] : Soshace.SCRIPTS_LIST;

    return {
        isProduction: isProduction,
        host: host,
        version: Soshace.VERSION,
        locale: request.i18n.getLocale(),
        isAuthenticated: request.isAuthenticated(),
        paths: Soshace.PATHS,
        profile: profile,
        profileUserName: profileUserName,
        //для шаблонов
        backend: true,
        scriptsList: scriptsList
    };
};