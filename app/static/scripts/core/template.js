'use strict';

(function (Soshace) {
    var _ = Soshace._;

    /**
     * Класс для работы с шаблонами
     *
     * Экземпляр создается при инициализации приложения
     *
     * @module Soshace.core.Template
     */
    Soshace.core.Template = Soshace.core.Class.extend({
        /**
         * Список используемых регулярных выражений
         *
         * @private
         * @field
         * @name Soshace.core.Template#_regExp
         * @type {Object}
         */
        _regExp: {
            inlineStringExpression: '/\\{\\{\\#(\\w+)(?:\\s(.*?))?\\}\\}/',
            inlineHtmlExpression: '/\\{\\{\\{\\#(\\w+)(?:\\s(.*?))?\\}\\}\\}/',
            blockExpression: '\\{\\{\\#(\\w+)\\}\\}(.*?){{\\/\\w+\\}\\}',
            partialExpression: '\\{\\{\\>(\\w+)\\}\\}',
            paramExpression: '\\{\\{\\(\\w+)\\}\\}',
            paramHtmlExpression: '\\{\\{\\{\\(\\w+)\\}\\}\\}'
        },

        /**
         * Список хелперов
         *
         * @private
         * @field
         * @name Soshace.core.Template#_helpers
         * @type {Object | null}
         */
        _helpers: null,

        /**
         * Список шаблонов
         *
         * @private
         * @field
         * @name Soshace.core.Template#_templates
         * @type {Object | null}
         */
        _templates: null,

        /**
         * @constructor
         * @name Soshace.core.Template#_templates
         * @param {Object} options
         * @returns {undefined}
         */
        initialize: function (options) {
            this._helpers = options.helpers || {};
            this._templates = options.templates || {};
        },

        /**
         * Метод возвращает шаблон по имени
         *
         * @public
         * @method
         * @name Soshace.core.Template#getTemplate
         * @returns {string}
         */
        getTemplate: function (templateName) {
            return this._templates[templateName];
        },

        /**
         * Метод возврашщает отрендеренный шаблон
         *
         * В метод передается имя шаблона и контекст
         *
         * @public
         * @method
         * @name Soshace.core.Template#render
         * @param {string} templateName имя шаблона
         * @param {Object} context контекст, в котором шаблон исполняется
         * @returns {string} отрендеренный шаблон
         */
        render: function (templateName, context) {
            var template = this.getTemplate(templateName);
            return this._render(template, context);
        },

        /**
         * Метод возврашщает отрендеренный шаблон
         *
         * В метод передается шаблон и контекст
         *
         * Порядок рендера имеет значение!
         *
         * @private
         * @method
         * @name Soshace.core.Template#render
         * @param {string} template шаблон
         * @param {Object} context контекст, в котором шаблон исполняется
         * @returns {string} отрендеренный шаблон
         */
        _render: function (template, context) {
            var blockExpression = this._regExp.blockExpression,
                inlineHtmlExpression = this._regExp.inlineHtmlExpression,
                inlineStringExpression = this._regExp.inlineStringExpression,
                partialExpression = this._regExp.partialExpression,
                paramExpression = this._regExp.paramExpression,
                paramHtmlExpression = this._regExp.paramHtmlExpression;

            template = template.replace(new RegExp(partialExpression, 'g'), _.bind(function () {
                var partialPath = arguments[0];

                this._renderPartial(partialPath, context);
            }, this));

            template = template.replace(new RegExp(blockExpression, 'g'), _.bind(function () {
                var argumentsList = _.toArray(arguments),
                    paramsList = argumentsList.push(context);

                this._renderBlockExpression.apply(this, paramsList);
            }, this));

            template = template.replace(new RegExp(inlineHtmlExpression, 'g'), _.bind(function () {
                var helpersName = arguments[0],
                    paramsListString = '' || arguments[1],
                    paramsList;

                paramsListString = _.trim(paramsListString);
                paramsList = paramsListString.split(/\s+/);
                this._renderInlineExpression(true, helpersName, paramsList, context);
            }, this));

            template = template.replace(new RegExp(inlineStringExpression, 'g'), _.bind(function () {
                var helpersName = arguments[0],
                    paramsListString = '' || arguments[1],
                    paramsList;

                paramsListString = _.trim(paramsListString);
                paramsList = paramsListString.split(/\s+/);
                this._renderInlineExpression(false, helpersName, paramsList, context);
            }, this));

            template = template.replace(new RegExp(paramHtmlExpression, 'g'), _.bind(function () {
                var paramName = arguments[0];

                this._renderParam(true, paramName, context);
            }, this));

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
         * @name Soshace.core.Template#_renderBlockExpression
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
         * @name Soshace.core.Template#_renderInlineExpression
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
         * Метод рендерит партиал
         *
         * @private
         * @method
         * @name Soshace.core.Template#_renderPartial
         * @param {string} partialPath
         * @param {Object} [context]
         * @returns {string} отрендеренный шаблон
         */
        _renderPartial: function (partialPath, context) {

        },

        /**
         * Метод ренедерит параметры вида {{param}} или {{{param}}}
         *
         * Тройные скобки - ренедерит, как html
         *
         * @private
         * @method
         * @name Soshace.core.Template#_renderParam
         * @param {boolean} isHtml true, если внутри содержится верстка, которую нужно отрендерить
         *                         в противном случае все теги будут экранированы
         *                         true - быть осторожным, есть опасность XSS
         * @param {string} paramName имя переменной
         * @param {Object} [context]
         * @returns {string} отрендеренный шаблон
         */
        _renderParam: function(isHtml, paramName, context){

        }
    });
})(window.Soshace);