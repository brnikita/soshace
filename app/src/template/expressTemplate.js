'use strict';

var _ = require('underscore'),
    Template = require('./template'),
    TemplateHelpers = require('./handlebarsHelpers'),
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
    initialize: function(options){
        this._layoutPath = options.layout;
        this.getTemplate(this._layoutPath, _.bind(function(template){
            this._layout = template;
        }, this));
        this._template = new Template();
    },

    /**
     * Метод возвращает шаблон по пути
     *
     * @method
     * @name ExpressTemplate#getTemplate
     * @param {string} templatePath путь до шаблона
     * @param callback
     * @returns {undefined}
     */
    getTemplate: function(templatePath, callback){

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