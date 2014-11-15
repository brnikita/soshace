'use strict';

var _ = require('underscore'),
    Class = srcRequire('common/class');

/**
 * Класс для работы с шаблонами
 *
 * Экземпляр создается при инициализации приложения
 *
 * @class Template
 */
module.exports = Class.extend({
    /**
     * Список используемых регулярных выражений
     *
     * @private
     * @field
     * @name Template#_regExp
     * @type {Object}
     */
    _regExp: {
        inlineStringExpression: '/\\{\\{\\#(\\w+)(?:\\s(.*?))?\\}\\}/',
        inlineHtmlExpression: '/\\{\\{\\{\\#(\\w+)(?:\\s(.*?))?\\}\\}\\}/',
        blockExpression: '\\{\\{\\#(\\w+)\\}\\}(.*?){{\\/\\w+\\}\\}',
        partialExpression: '\\{\\{\\>\\s?(\\w+)\\}\\}',
        paramExpression: '\\{\\{(\\w+)\\}\\}',
        paramHtmlExpression: '\\{\\{\\{(\\w+)\\}\\}\\}'
    },

    /**
     * Список хелперов
     *
     * @private
     * @field
     * @name Template#_helpers
     * @type {Object | null}
     */
    _helpers: null,

    /**
     * List of templates
     *
     * @private
     * @field
     * @name Template#_templates
     * @type {Object | null}
     */
    _templates: null,

    /**
     * @constructor
     * @name Template#_templates
     * @param {Object} options
     * @returns {undefined}
     */
    initialize: function (options) {
        options = options || {};
        this._helpers = options.helpers || {};
        this._templates = options.templates || {};
    },

    /**
     * Method returns partial by template path
     *
     * @public
     * @name Template#getPartial
     * @param {string} partialPath
     * @returns {string}
     */
    getPartial: function (partialPath) {
        var fullPartialPath = 'partials/' + partialPath;

        return  this._templates[fullPartialPath];
    },

    /**
     * Метод возвращает шаблон по имени
     *
     * @public
     * @method
     * @name Template#getTemplate
     * @param {string} templatePath путь до шаблона
     * @returns {string}
     */
    getTemplate: function (templatePath) {
        return this._templates[templatePath];
    },

    /**
     * Метод устанавливает записывает шаблон в объет
     *
     * @method
     * @name Template#setTemplate
     * @param {string} templatePath уть до шаблона
     * @param {string} template шаблон
     * @returns {undefined}
     */
    setTemplate: function (templatePath, template) {
        this._templates[templatePath] = template;
    },

    /**
     * Метод возврашщает отрендеренный шаблон
     *
     * В метод передается имя шаблона и контекст
     *
     * @public
     * @method
     * @name Template#render
     * @param {string} templateName имя шаблона
     * @param {Object} context контекст, в котором шаблон исполняется
     * @returns {string} отрендеренный шаблон
     */
    render: function (templateName, context) {
        var template = this.getTemplate(templateName);
        return this.renderTemplate(template, context);
    },

    /**
     * Метод возврашает отрендеренный шаблон
     *
     * В метод передается шаблон и контекст
     *
     * Порядок рендера имеет значение!
     *
     * @public
     * @method
     * @name Template#renderTemplate
     * @param {string} template шаблон
     * @param {Object} context контекст, в котором шаблон исполняется
     * @returns {string} отрендеренный шаблон
     */
    renderTemplate: function (template, context) {
        var blockExpression = this._regExp.blockExpression,
            inlineHtmlExpression = this._regExp.inlineHtmlExpression,
            inlineStringExpression = this._regExp.inlineStringExpression,
            paramExpression = this._regExp.paramExpression,
            paramHtmlExpression = this._regExp.paramHtmlExpression;

        this._setPartials(template);

        //Рендер блоковых выражений
        template = template.replace(new RegExp(blockExpression, 'g'), _.bind(function () {
            var argumentsList = _.toArray(arguments),
                paramsList = argumentsList.push(context);

            this._renderBlockExpression.apply(this, paramsList);
        }, this));

        //Рендер инлайновых выражений с рендером html
        template = template.replace(new RegExp(inlineHtmlExpression, 'g'), _.bind(function () {
            var helpersName = arguments[0],
                paramsListString = '' || arguments[1],
                paramsList;

            paramsListString = _.trim(paramsListString);
            paramsList = paramsListString.split(/\s+/);
            this._renderInlineExpression(true, helpersName, paramsList, context);
        }, this));

        //Рендер инлайновых выражений, теги будут экранированы
        template = template.replace(new RegExp(inlineStringExpression, 'g'), _.bind(function () {
            var helpersName = arguments[0],
                paramsListString = '' || arguments[1],
                paramsList;

            paramsListString = _.trim(paramsListString);
            paramsList = paramsListString.split(/\s+/);
            this._renderInlineExpression(false, helpersName, paramsList, context);
        }, this));

        //Рендер параметров в html
        template = template.replace(new RegExp(paramHtmlExpression, 'g'), _.bind(function () {
            var paramName = arguments[0];

            this._renderParam(true, paramName, context);
        }, this));

        //Рендер параметров в строку, тэги будут экранированы
        template = template.replace(new RegExp(paramExpression, 'g'), _.bind(function () {
            var paramName = arguments[0];

            this._renderParam(false, paramName, context);
        }, this));

        return template;
    },

    /**
     * Метод отрисовывает блоки вида {{#helper param}}{{/helper}}
     *
     * @private
     * @method
     * @name Template#_renderBlockExpression
     * @param {string} helperName
     * @param {string} body
     * @param {Object} [context] переменные переданные при рендере шаблона
     * @returns {string} отрендеренный шаблон
     */
    _renderBlockExpression: function (helperName, body, context) {
        return this._helpers[helperName](body, context);
    },

    /**
     * Метод рендерит выражения вида {{#helper param1 param2 param3 ... paramN}}
     *                               {{{#helper param1 param2 param3 ... paramN}}}
     *
     * Тройные скобки - ренедерит, как html
     *
     * @private
     * @method
     * @name Template#_renderInlineExpression
     * @param {boolean} isHtml true, если внутри содержится верстка, которую нужно отрендерить
     *                         в противном случае все теги будут экранированы
     *                         true - быть осторожным, есть опасность XSS
     * @param {string} helperName
     * @param {Array} paramsList список параметров
     * @param {Object} [context] переменные переданные при рендере шаблона
     * @returns {string} отрендеренный шаблон
     */
    _renderInlineExpression: function (isHtml, helperName, paramsList, context) {

    },

    /**
     * Method sets partials in template
     *
     * Method return template with partials
     *
     * @private
     * @method
     * @name Template#_setPartials
     * @param {string} partialPath
     * @param {Object} [context]
     * @returns {string}
     */
    _setPartials: function (partialPath, context) {
        var partialExpression = this._regExp.partialExpression;

        template = template.replace(new RegExp(partialExpression, 'g'), _.bind(function () {
            var partialPath = arguments[1];

            this._renderPartial(partialPath, context);
        }, this));

        this.getPartial(partialPath, function (error, partial) {
            if (error) {
                console.log(error);
            }
            console.log(partial);
        });
    },

    /**
     * Метод ренедерит параметры вида {{param}} или {{{param}}}
     *
     * Тройные скобки - ренедерит, как html
     *
     * @private
     * @method
     * @name Template#_renderParam
     * @param {boolean} isHtml true, если внутри содержится верстка, которую нужно отрендерить
     *                         в противном случае все теги будут экранированы
     *                         true - быть осторожным, есть опасность XSS
     * @param {string} paramName имя переменной
     * @param {Object} [context]
     * @returns {string} отрендеренный шаблон
     */
    _renderParam: function (isHtml, paramName, context) {

    }
});