'use strict';

/**
 * Плагин календарей (3 селекта: день, месяк, год)
 */
define([
    'jquery',
    'underscore',
    'utils/helpers'
], function ($, _, Helpers) {
    var defaultOptions = {
            startYear: 1900
        },
        monthsList = Soshace.monthsList,
        methods = {
            /**
             * @constructor
             * @name jQuery.fn.calendar#initialize
             * @param {Object} options
             *                 [options.startYear] - год, с которого начинается календарь
             *                 [options.endYear] - год, на котором заканчивается календарь
             *                 options.selectedDate - выставленная дата в календаре
             *                 options.dateField - имя поля даты
             *                 options.monthField - имя поля месяца
             *                 options.fullYearField - имя поля года
             * @returns {undefined}
             */
            initialize: function (options) {
                var pluginOptions = _.extend(defaultOptions, options);

                return this.each(_.bind(function () {
                    this.calendar('setOptions', pluginOptions);
                    this.calendar('render');
                    this.calendar('addListeners');
                }, this));
            },

            /**
             * Метод добавляет слушатели на элемент календаря
             *
             * @method
             * @name jQuery.fn.calendar#addListeners
             * @returns {undefined}
             */
            addListeners: function(){
                this.on('change', '.js-calendar-date', methods.dateChangeHandler, methods);
                this.on('change', '.js-calendar-month', methods.monthChangeHandler, methods);
                this.on('change', '.js-calendar-year', methods.yearChangeHandler, methods);
            },

            /**
             * Метод слушатель изменения даты
             *
             * @method
             * @name jQuery.fn.calendar#dateChangeHandler
             * @param {jQuery.Event} event
             * @returns {undefined}
             */
            dateChangeHandler: function(event){
                var $target = $(event.target),
                    value = $target.val();
            },

            /**
             * Метод слушатель изменения месяца
             *
             * @method
             * @name jQuery.fn.calendar#monthChangeHandler
             * @param {jQuery.Event} event
             * @returns {undefined}
             */
            monthChangeHandler: function(event){
                var $target = $(event.target),
                    value = $target.val();
            },

            /**
             * Метод слушатель изменения года
             *
             * @method
             * @name jQuery.fn.calendar#yearChangeHandler
             * @param {jQuery.Event} event
             * @returns {undefined}
             */
            yearChangeHandler: function(event){
                var $target = $(event.target),
                    value = $target.val();
            },

            /**
             * Метод рендерит календари на основе параметров
             *
             * @method
             * @name jQuery.fn.calendar#render
             * @returns {undefined}
             */
            render: function () {
                var lists = this.calendar('getLists'),
                    options = this.calendar('getOptions'),
                    template = Soshace.hbs['partials/jquery/calendar/calendar'](
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
                var pluginOptions = this.calendar('getOptions') || {};
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
                    datesList: _this.calendar('getDatesList'),
                    monthsList: _this.calendar('getMothsList'),
                    fullYearsList: _this.calendar('getYearsList')
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
                    options = this.calendar('getOptions'),
                    startYear = options.startYear,
                    endYear = options.endYear,
                    selectedYear = this.calendar('getSelectedYear'),
                    isSelected,
                    year,
                    list = [];

                endYear = endYear || currentYear;

                for (year = startYear; year <= endYear; year++) {
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
                var options = this.calendar('getOptions'),
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
             * @returns {Array}
             */
            getMothsList: function () {
                var selectedMonth = this.calendar('getSelectedMonth'),
                    months = _.clone(monthsList);

                _.each(months, function (month) {
                    var title = month.title,
                        value = month.value;

                    month.title = Helpers.i18n(title);
                    month.selected = value === selectedMonth;
                });

                return months;
            },

            /**
             * Метод возвращает установленный месяц
             *
             * @method
             * @name jQuery.fn.calendar#getSelectedMonth
             * @returns {Number}
             */
            getSelectedMonth: function () {
                var options = this.calendar('getOptions'),
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
             * @returns {Array}
             */
            getDatesList: function () {
                var dates = [],
                    date,
                    isSelected,
                    selectedDate = this.calendar('getSelectedDate'),
                    daysInMonth = this.calendar('getDaysInMonth');

                for (date = 1; date <= daysInMonth; date++) {
                    isSelected = date === selectedDate;
                    dates.push({
                        title: date,
                        value: date,
                        selected: isSelected
                    });
                }

                return dates;
            },

            /**
             * Метод возвращает количество дней в текущем месяце
             *
             * @method
             * @name jQuery.fn.calendar#getDaysInMonth
             * @returns {number}
             */
            getDaysInMonth: function () {
                var year = this.calendar('getSelectedYear'),
                    month = this.calendar('getSelectedMonth');

                return new Date(year, month, 0).getDate();
            },

            /**
             * Метод возвращает установленный день
             *
             * @method
             * @name jQuery.fn.calendar#getSelectedDate
             * @returns {Number}
             */
            getSelectedDate: function () {
                var options = this.calendar('getOptions'),
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
                this.calendar('setOptions', {selectedDate: selectedDate});
                this.calendar('render');
                this.trigger('calendar.updated', selectedDate);
            },

            /**
             * Метод возвращает timestamp выставленной даты
             *
             * @method
             * @name jQuery.fn.calendar#getDate
             * @returns {String}
             */
            getDate: function () {
                var options = this.calendar('getOptions');
                return options.selectedDate;
            }
        };

    $.fn.calendar = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }

        if (typeof method === 'object' || !method) {
            return methods.initialize.apply(this, arguments);
        }

        return $.error('Метод с именем ' + method + ' не существует для jQuery.calendar');

    };
});