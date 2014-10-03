'use strict';

var _ = require('underscore'),
    fs = require('fs'),
    path = require('path'),
    Template = require('./template'),
    TemplateHelpers = require('./templateHelpers'),
    Class = srcRequire('common/class');

/**
 * Модуль адаптер для работы express с шаблонами
 *
 * Экземпляр создается при инициализации приложения
 *
 * @class ExpressTemplate
 */
module.exports = Class.extend({
    /**
     * Экземпляр класса Template
     *
     * @private
     * @field
     * @name ExpressTemplate#template
     * @type {Template | null}
     */
    _template: null,

    /**
     * Путь до лайаута
     *
     * @private
     * @field
     * @name ExpressTemplate#_layoutPath
     * @type {string | null}
     */
    _layoutPath: null,

    /**
     * Тело лайоута
     *
     * @field
     * @name ExpressTemplate#_layout
     * @type {string | null}
     */
    _layout: null,

    /**
     * @constructor
     * @name ExpressTemplate#initialize
     * @param {Object} options
     * @returns {undefined}
     */
    initialize: function (options) {
        options = options || {};
        this._layoutPath = options.layout;
        this._template = new Template();
        this._getTemplate(this._layoutPath, _.bind(function (error, template) {
            if (error === null) {
                this._layout = template;
            }
        }, this));
    },

    /**
     * Метод возвращает шаблон по пути
     *
     * @private
     * @method
     * @name ExpressTemplate#_getTemplate
     * @param {string} templatePath путь до шаблона
     * @param {Function} callback
     * @returns {undefined}
     */
    _getTemplate: function (templatePath, callback) {
        templatePath = path.resolve(templatePath);

        var template = this._template.getTemplate(templatePath);

        if (template) {
            callback(null, template);
            return;
        }

        fs.readFile(templatePath, 'utf8', _.bind(function (error, template) {
            if (!error) {
                this._template.setTemplate(templatePath, template);
                callback(null, template);
            }

            callback(error);
        }, this));
    },

    /**
     * Метод передается в app.engine в качестве обработчика
     *
     * @public
     * @method
     * @param {string} templatePath путь до шаблона
     * @param {Object} request параметры запроса
     * @param {Function} callback
     * @returns {undefined}
     */
    engine: function (templatePath, request, callback) {
        var templateHelpers = new TemplateHelpers(request);
        callback(null, 'Hello world');
    }
});