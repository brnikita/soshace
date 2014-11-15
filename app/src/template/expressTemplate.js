//TODO: продолжить!
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
     * Method walks through directory recursively
     *
     * Method passes to callback list of files
     *
     * @method
     * @name ExpressTemplate#walk
     * @param {string} directoryPath
     * @param {Function} callback
     * @returns {undefined}
     */
    walk: function (directoryPath, callback) {
        var _this = this,
            filesList = [];

        fs.readdir(directoryPath, function (error, files) {
            var pending = files.length;

            if (error) {
                callback(error);
                return;
            }

            if (pending === 0) {
                callback(null, filesList);
                return;
            }

            files.forEach(function (file) {
                file = directoryPath + '/' + file;
                fs.stat(file, function (error, stat) {
                    if (stat && stat.isDirectory()) {
                        _this.walk(file, function (error, resuls) {
                            filesList = filesList.concat(resuls);
                            if (!--pending) {
                                callback(null, filesList);
                            }
                        });
                        return;
                    }

                    filesList.push(file);
                    if (!--pending) {
                        callback(null, filesList);
                    }
                });
            });
        });
    },

    /**
     * Method preloads templates to cache
     *
     * @method
     * @name ExpressTemplate#preLoadTemplates
     * @param {Function} callback
     * @returns {undefined}
     */
    preLoadTemplates: function (callback) {
        var viewsPath = Soshace.DIR_NAME + '/app/views';

        this.walk(viewsPath, function (error, files) {
            console.log(files);
        })
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
     * @name ExpressTemplate#_getLayout
     * @param {Object} params параметры переданные в шаблон
     * @param {Function} callback
     * @returns {undefined}
     */
    _getLayout: function (params, callback) {
        var layoutPath = this._getLayoutPath(params.layout),
            layout = this._layouts[layoutPath];

        if (!_.isUndefined(layout)) {
            callback(null, layout);
            return;
        }

        fs.readFile(layoutPath, 'utf8', _.bind(function (error, template) {
            if (!error) {
                this._layouts[layoutPath] = template;
                callback(null, template);
                return;
            }

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
        this._getLayout(params, _.bind(function (error, layout) {
            if (error) {
                callback(error);
                return;
            }

            this._getTemplate(templatePath, params, _.bind(function (error, template) {
                if (error) {
                    callback(error);
                    return;
                }

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
        var template,
            fullTemplatePath = path.resolve(templatePath);

        template = this._template.getTemplate(templatePath);
        if (template) {
            callback(null, template);
            return;
        }

        fs.readFile(fullTemplatePath, 'utf8', _.bind(function (error, template) {
            if (error) {
                callback(error);
                return;
            }

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