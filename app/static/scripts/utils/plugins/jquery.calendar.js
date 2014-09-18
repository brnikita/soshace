'use strict';

/**
 * Плагин календарей (3 селекта: день, месяк, год)
 */
define([
    'jquery',
    'underscore'
], function ($, _) {
    var defaultOptions = {
            startYear: 1900
        },
        monthsList = [
            {
                value: 1,
                title: 'january'
            },
            {
                value: 2,
                title: 'february'
            },
            {
                value: 3,
                title: 'march'
            },
            {
                value: 4,
                title: 'april'
            },
            {
                value: 5,
                title: 'may'
            },
            {
                value: 6,
                title: 'june'
            },
            {
                value: 7,
                title: 'july'
            },
            {
                value: 8,
                title: 'august'
            },
            {
                value: 9,
                title: 'september'
            },
            {
                value: 10,
                title: 'october'
            },
            {
                value: 11,
                title: 'november'
            },
            {
                value: 12,
                title: 'december'
            }

        ],
        methods = {
            /**
             * @constructor
             * @name jQuery.fn.calendar#initialize
             * @param {Object} options
             *                 [options.startYear] - год, с которого начинается календарь
             *                 [options.endYear] - год, на котором заканчивается календарь
             *                 options.locale - локаль календаря
             *                 options.selectedDate - выставленная дата в календаре
             *                 options.dateField - имя поля даты
             *                 options.monthField - имя поля месяца
             *                 options.fullYearField - имя поля года
             * @returns {undefined}
             */
            initialize: function (options) {
                var pluginOptions = _.extend(defaultOptions, options);

                return this.each(_.bind(function () {
                    this.setOptions(pluginOptions);
                }, this));
            },

            /**
             * Метод рендерит календари на основе параметров
             *
             * @method
             * @name jQuery.fn.calendar#render
             * @returns {undefined}
             */
            render: function () {
                var lists = this.getLists(),
                    options = this.getOptions(),
                    template = Soshace.hbs['plugins/jquery/calendar/calendar'](
                        _.extend(lists, options));

                this.html(template);
            },

            /**
             * Метод сохраняет настройки в данных элемента
             *
             * @method
             * @name jQuery.fn.calendar#setOptions
             * @param {Object} options
             * @returns {undefined}
             */
            setOptions: function (options) {
                var pluginOptions = this.getOptions();
                this.data('calendar', _.extend(pluginOptions, options));
            },

            /**
             * Метод возвращает параметры контрола
             *
             * @method
             * @name jQuery.fn.calendar#getOptions
             * @returns {Object}
             */
            getOptions: function () {
                return this.data('calendar');
            },

            /**
             * Метод возвращает списки дат, месяцев и лет
             *
             * @method
             * @name jQuery.fn.calendar#getLists
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
             * @name jQuery.fn.calendar#getYearsList
             * @returns {Array}
             */
            getYearsList: function () {
                var currentDate = new Date(),
                    currentYear = currentDate.getFullYear(),
                    options = this.getOptions(),
                    startYear = options.startYear,
                    endYear = options.endYear,
                    selectedYear = this.getSelectedYear(),
                    isSelected,
                    year,
                    list = [];

                endYear = endYear || currentYear;

                for (year = startYear; year < endYear; year++) {
                    isSelected = year === selectedYear;
                    list.push({
                        value: year,
                        title: year,
                        selected: isSelected
                    });
                }
                return list;
            },

            /**
             * Метод возвращает установленный год
             *
             * @method
             * @name jQuery.fn.calendar#getSelectedYear
             * @returns {Number}
             */
            getSelectedYear: function () {
                var options = this.getOptions(),
                    selectedDate = options.selectedDate,
                    selectedDateObj,
                    today;

                if (_.isUndefined(selectedDate)) {
                    today = new Date();
                    return today.getFullYear();
                }

                selectedDateObj = new Date(selectedDate);
                return selectedDateObj.getFullYear();
            },

            /**
             * Метод возвращает список месяцев
             *
             * @method
             * @name jQuery.fn.calendar#getMothsList
             * @returns {undefined}
             */
            getMothsList: function () {

            },

            /**
             * Метод возвращает установленный месяц
             *
             * @method
             * @name jQuery.fn.calendar#getSelectedMonth
             * @returns {Number}
             */
            getSelectedMonth: function () {
                var options = this.getOptions(),
                    selectedDate = options.selectedDate,
                    selectedDateObj,
                    today;

                if (_.isUndefined(selectedDate)) {
                    today = new Date();
                    return today.getMonth() + 1;
                }

                selectedDateObj = new Date(selectedDate);
                return selectedDateObj.getMonth() + 1;
            },

            /**
             * Метод возвращает список дат
             *
             * @method
             * @name jQuery.fn.calendar#getDatesList
             * @returns {undefined}
             */
            getDatesList: function () {

            },

            /**
             * Метод возвращает установленный день
             *
             * @method
             * @name jQuery.fn.calendar#getSelectedDate
             * @returns {Number}
             */
            getSelectedDate: function () {
                var options = this.getOptions(),
                    selectedDate = options.selectedDate,
                    selectedDateObj,
                    today;

                if (_.isUndefined(selectedDate)) {
                    today = new Date();
                    return today.getDate();
                }

                selectedDateObj = new Date(selectedDate);
                return selectedDateObj.getDate();
            },

            /**
             * Метод устанавливает дату календаря
             *
             * @method
             * @name jQuery.fn.calendar#setDate
             * @param {String} selectedDate timestamp текущей даты
             * @returns {undefined}
             */
            setDate: function (selectedDate) {
                this.setOptions({selectedDate: selectedDate});
            },

            /**
             * Метод возвращает timestamp выставленной даты
             *
             * @method
             * @name jQuery.fn.calendar#setDate
             * @returns {String}
             */
            getDate: function () {
                var options = this.getOptions();
                return options.selectedDate;
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