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
     * @name ExpressTemplate#_defaultLayoutPath
     * @type {string | null}
     */
    _defaultLayoutPath: null,

    /**
     * Тело лайоута
     *
     * @field
     * @name ExpressTemplate#_defaultLayout
     * @type {string | null}
     */
    _defaultLayout: null,

    /**
     * @constructor
     * @name ExpressTemplate#initialize
     * @param {Object} options
     * @returns {undefined}
     */
    initialize: function (options) {
        options = options || {};
        this._defaultLayoutPath = options.defaultLayout;
        this._template = new Template();
        this._getTemplate(this._defaultLayoutPath, _.bind(function (error, template) {
            console.log('template', null);
            if (error !== null) {
                console.log(template);
                this._defaultLayout = template;
            }
        }, this));
    },

    /**
     * Метод возвращает шаблон вместе с лайоутом
     *
     * @private
     * @method
     * @name ExpressTemplate#_getTemplateWithLayout
     * @param {string} template
     * @returns {string}
     */
    _getTemplateWithLayout: function (template) {
        if (this._defaultLayout === null) {
            return template;
        }

        return this._defaultLayout.replace('{{{body}}}', template);
    },

    _getLayout: function(layoutPath){

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
                template = this._getTemplateWithLayout(template);
                this._template.setTemplate(templatePath, template);
                callback(null, template);
                return;
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
     * @param {Object} params параметры переданные в шаблон
     * @param {Function} callback
     * @returns {undefined}
     */
    engine: function (templatePath, params, callback) {
        this._getTemplate(templatePath, _.bind(function (error, template) {
            if (error) {
                callback(error);
                return;
            }

            callback(null, this._template.renderTemplate(template, params));
        }, this));
    }
});