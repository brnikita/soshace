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
     * Field contains list of cached layouts
     *
     * {
     *   layoutName: '<html>...</html>',
     *   ...
     * }
     *
     * @private
     * @field
     * @name ExpressTemplate#_layouts
     * @type {Object | null}
     */
    _layouts: null,

    /**
     * Field contains layout path of current request
     *
     * @private
     * @method
     * @name ExpressTemplate#_layoutPath
     * @type {string | null}
     */
    _layoutPath: null,

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
     * @constructor
     * @name ExpressTemplate#initialize
     * @param {Object} options
     * @returns {undefined}
     */
    initialize: function (options) {
        options = options || {};
        this._defaultLayoutPath = options.defaultLayout;
        this._template = new Template();
        this._layouts = {};
    },

    /**
     * Method returns current layout path
     *
     * @private
     * @name ExpressTemplate#_getLayoutPath
     * @param {string} layoutPath
     * @returns {string}
     */
    _getLayoutPath: function (layoutPath) {
        return path.resolve(layoutPath || this._defaultLayoutPath);
    },

    /**
     * Method returns current layout
     *
     * @private
     * @method
     * @name ExpressTemplate#_getTemplateWithLayout
     * @param {Object} params параметры переданные в шаблон
     * @param {Function} callback
     * @returns {undefined}
     */
    _getLayout: function (params, callback) {
        var layoutPath = this._getLayoutPath(params.layout),
            layout = this._layouts[layoutPath];
        console.log(1);
        if (!_.isUndefined(layout)) {
            console.log(2);
            callback(null, layout);
            return;
        }

        console.log(3);
        fs.readFile(layoutPath, 'utf8', _.bind(function (error, template) {
            console.log(4);
            if (!error) {
                console.log(5);
                this._layouts[layoutPath] = template;
                callback(null, template);
                return;
            }

            console.log(6);
            callback(error);
        }, this));
    },

    /**
     * Метод возвращает шаблон вместе с лайоутом
     *
     * @private
     * @method
     * @name ExpressTemplate#_getTemplateWithLayout
     * @param {string} templatePath
     * @param {Object} params параметры переданные в шаблон
     * @param {Function} callback
     * @returns {undefined}
     */
    _getTemplateWithLayout: function (templatePath, params, callback) {
        console.log(0);
        this._getLayout(params, _.bind(function (error, layout) {
            if (error) {
                console.log(6);
                callback(error);
                return;
            }

            console.log(7);
            this._getTemplate(templatePath, params, _.bind(function (error, template) {
                console.log(15);
                if (error) {
                    console.log(16);
                    callback(error);
                    return;
                }

                console.log(17);
                callback(null, layout.replace('{{{body}}}', template));
            }, this));
        }, this));
    },

    /**
     * Метод возвращает шаблон по пути
     *
     * @private
     * @method
     * @name ExpressTemplate#_getTemplate
     * @param {Object} params параметры переданные в шаблон
     * @param {string} templatePath путь до шаблона
     * @param {Function} callback
     * @returns {undefined}
     */
    _getTemplate: function (templatePath, params, callback) {
        var template;
        console.log(8);
        templatePath = path.resolve(templatePath);
        template = this._template.getTemplate(templatePath);
        console.log(9);
        if (template) {
            console.log(10);
            callback(null, template);
        }

        console.log(11);
        fs.readFile(templatePath, 'utf8', _.bind(function (error, template) {
            console.log(12);
            if (error) {
                console.log(13);
                callback(error);
                return;
            }

            console.log(14);
            this._template.setTemplate(templatePath, template);
            callback(null, template);
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
        this._getTemplateWithLayout(templatePath, params, _.bind(function (error, template) {
            if (error) {
                callback(error);
                return;
            }

            callback(null, this._template.renderTemplate(template, params));
        }, this));
    }
});