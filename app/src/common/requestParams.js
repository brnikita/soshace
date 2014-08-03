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
    var _ = require('underscore'),
        HandlebarsHelpers = require('./handlebarsHelpers'),
        helpers = new HandlebarsHelpers(request),
        profile = request.user && request.user[0],
        profileUserName = profile && profile.userName;

    /**
     * Метод возвращает клсасс фона рандомный
     *
     * @method
     * @returns {String} класс фона
     */
    function getRandomBackground(){
        var backgrounds = Soshace.BACKGROUNDS,
            max = backgrounds.length - 1,
            random = _.random(0, max);

        return backgrounds[random];
    }

    return {
        isProduction: Soshace.IS_PRODUCTION,
        version: Soshace.VERSION,
        helpers: helpers,
        locale: request.i18n.getLocale(),
        isAuthenticated: request.isAuthenticated(),
        paths: Soshace.PATHS,
        profile: profile,
        profileUserName: profileUserName,
        bodyBg: getRandomBackground(),
        //для шаблонов
        backend: true
    };
};