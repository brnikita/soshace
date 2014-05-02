'use strict';

/**
 * Конструктор основных переменных для рендера шаблонов
 *
 * @constructor
 * @name RenderParams
 * @param {Object} request
 * @returns {Object}
 */
module.exports = function (request) {
    var HandlebarsHelpers = require('./handlebarsHelpers'),
        helpers = new HandlebarsHelpers(request);

    return {
        isProduction: soshace.IS_PRODUCTION,
        version: soshace.VERSION,
        helpers: helpers
    };
};