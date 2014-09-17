'use strict';

/**
 * Плагин календарей (3 селекта: день, месяк, год)
 */
define([
    'jquery',
    'underscore'
], function ($, _) {
    var pluginOptions = {
            startYear: 1900
        },
        methods = {
            /**
             * @constructor
             * @name jQuery.fn.masks#initialize
             * @param {Object} options
             *                 [options.startYear] - год, с которого начинается календарь
             *                 [options.endYear] - год, на котором заканчивается календарь
             *                 options.dateField - имя поля даты
             *                 options.monthField - имя поля месяца
             *                 options.fullYearField - имя поля года
             * @returns {undefined}
             */
            initialize: function (options) {
                pluginOptions = _.extend(pluginOptions, options);

                return this.each(_.bind(function () {
                    var lists = this.getLists(),
                        $this = $(this),
                        template = Soshace.hbs['plugins/jquery/calendar/calendar'](
                            _.extend(lists, pluginOptions));

                    $this.html(template);
                }, this));
            },

            /**
             * Метод возвращает списки дат, месяцев и лет
             *
             * @method
             * @name jQuery.fn.masks#getLists
             * @returns {Object}
             */
            getLists: function () {
                var _this = this;

                return {
                    datesList: _this.getDatesList(),
                    monthsList: _this.getMothsList(),
                    fullYearsList: _this.getYearsList()
                };
            },

            /**
             * Метод возвращает список лет
             *
             * @method
             * @name jQuery.fn.masks#getYearsList
             * @returns {Array}
             */
            getYearsList: function () {
                var currentDate = new Date(),
                    currentYear = currentDate.getFullYear(),
                    startYear = pluginOptions.startYear,
                    endYear = pluginOptions.endYear,
                    isCurrentYear,
                    year,
                    list = [];

                endYear = endYear || currentYear;

                for (year = startYear; year < endYear; year++) {
                    isCurrentYear
                    list.push({
                        value: year,
                        title: year,
                        selected: year === currentYear
                    });
                }
                return list;
            },

            /**
             * Метод возвращает список месяцев
             *
             * @method
             * @name jQuery.fn.masks#getMothsList
             * @returns {undefined}
             */
            getMothsList: function () {

            },

            /**
             * Метод возвращает список дат
             *
             * @method
             * @name jQuery.fn.masks#getDatesList
             * @returns {undefined}
             */
            getDatesList: function () {

            }
        };

    $.fn.masks = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }

        if (typeof method === 'object' || !method) {
            return methods.initialize.apply(this, arguments);
        }

        return $.error('Метод с именем ' + method + ' не существует для jQuery.calendar');

    };
});