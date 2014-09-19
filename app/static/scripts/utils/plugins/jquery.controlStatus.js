/**
 * Плагин для показа ошибок, подсказок у полей и
 * отображения успешных полей
 */

'use strict';

define([
    'jquery',
    'underscore'
], function ($, _) {
    var methods = {
        /**
         * @constructor
         * @param {Object} [options]
         *                  options.helperTitle - текст подсказки для поля
         *                  options.successTitle - текст сообщения для
         *                  успешного поля
         * @returns {jQuery}
         */
        initialize: function (options) {
            var controlOptions = {},
                $formGroup = this.parent();

            _.extend(controlOptions, options || {});
            this.data('controlStatus', controlOptions);
            $formGroup.addClass('has-feedback');
            $formGroup.append($('<span>', {
                'class': 'form-control-feedback'
            }));
            $formGroup.append($('<div>', {
                'class': 'form-group-status',
                style: 'display: none;'
            }));

            return this;
        },

        /**
         * Метод показывает тултип подсказки у поля
         *
         * @method
         * @returns {jQuery}
         */
        helper: function () {
            var controlStatusData = this.data('controlStatus'),
                $formGroup = this.parent(),
                $groupStatus = $('.form-group-status', $formGroup);

            $formGroup.removeClass('has-error');
            $formGroup.removeClass('has-success');
            $groupStatus.html(controlStatusData.helperTitle);

            if (!controlStatusData.helperIsShowing) {
                $groupStatus.slideDown();
            }

            this.data('controlStatus', _.extend(controlStatusData, {
                helperIsShowing: true,
                status: 'helper'
            }));

            return this;
        },

        /**
         * Метод скрывает тултипы подсказки у поля
         *
         * @method
         * @returns {jQuery}
         */
        hideHelper: function () {
            var controlStatusData = this.data('controlStatus');

            if (!(controlStatusData && controlStatusData.helperIsShowing)) {
                return this;
            }

            this.data('controlStatus', _.extend(controlStatusData, {
                helperIsShowing: false
            }));

            this.siblings('.form-group-status').
                slideUp();

            return this;
        },

        /**
         * Метод отображает ошибку у поля
         *
         * @method
         * @param {String} error текст ошибки
         * @returns {jQuery}
         */
        error: function (error) {
            var controlStatusData = this.data('controlStatus') || {},
                $formGroup = this.parent(),
                $groupStatus = $('.form-group-status', $formGroup);

            $formGroup.removeClass('has-success');
            $formGroup.addClass('has-error');
            $groupStatus.html(error);

            if (!(controlStatusData.helperIsShowing)) {
                $groupStatus.slideDown();
            }

            this.data('controlStatus', _.extend(controlStatusData, {
                helperIsShowing: true,
                status: 'error'
            }));

            return this;
        },

        /**
         * Метод устаналивает поле в состояние успех
         *
         * @method
         * @returns {jQuery}
         */
        success: function () {
            var controlStatusData = this.data('controlStatus'),
                $formGroup = this.parent(),
                $groupStatus = $('.form-group-status', $formGroup);

            $formGroup.removeClass('has-error');
            $formGroup.addClass('has-success');
            $groupStatus.html(controlStatusData.successTitle);

            if (!(controlStatusData && controlStatusData.helperIsShowing)) {
                $groupStatus.slideDown();
            }

            this.data('controlStatus', _.extend(controlStatusData, {
                status: 'success'
            }));

            return this;
        },

        /**
         * Метод устанавливает поле в дефолтное состояние
         *
         * @method
         * @returns {jQuery}
         */
        base: function () {
            var controlStatusData = this.data('controlStatus'),
                $formGroup = this.parent();

            $formGroup.removeClass('has-error');
            $formGroup.removeClass('has-success');
            this.controlStatus('hideHelper');
            this.data('controlStatus', _.extend(controlStatusData, {
                status: null
            }));

            return this;
        },

        /**
         * Метод удалет все слушатели и чистит все за плагином
         *
         * @method
         * @returns {jQuery}
         */
        destroy: function () {
            var $formGroup = this.parent();

            this.removeData('controlStatus');
            $formGroup.removeClass('has-feedback');
            $('.form-group-status', $formGroup).remove();
            $('.form-control-feedback', $formGroup).remove();

            return this;
        }
    };

    $.fn.controlStatus = function (method) {
        var optionsList = arguments;

        return this.each(function () {
            var $this = $(this);

            if (methods[method]) {
                methods[method].apply($this, Array.prototype.slice.call(optionsList, 1));
                return;
            }

            if (typeof method === 'object' || !method) {
                methods.initialize.apply($this, optionsList);
                return;
            }

            $.error('Метод с именем ' + method + ' не существует для jQuery.controlStatus');
        });
    };
});