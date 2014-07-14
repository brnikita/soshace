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
            return this.each(function () {
                var $this = $(this),
                    $formGroup = $this.parent();

                if (options) {
                    $this.data('controlStatus', options);
                    $formGroup.addClass('has-feedback');
                    $formGroup.append($('<span>', {
                        'class': 'form-control-feedback'
                    }));
                    $formGroup.append($('<div>', {
                        'class': 'form-group-status',
                        style: 'display: none;'
                    }));
                }
            });
        },

        /**
         * Метод показывает тултип подсказки у поля
         *
         * @method
         * @returns {undefined}
         */
        helper: function () {
            var $this = $(this),
                controlStatusData = $this.data('controlStatus'),
                $formGroup = $this.parent(),
                $groupStatus =  $('.form-group-status', $formGroup);

            $formGroup.removeClass('has-error');
            $formGroup.removeClass('has-success');
            $groupStatus.html(controlStatusData.helperTitle);

            if (!controlStatusData.helperIsShowing) {
                $groupStatus.slideDown();
            }

            $this.data('controlStatus', _.extend(controlStatusData, {
                helperIsShowing: true,
                status: 'helper'
            }));
        },

        /**
         * Метод скрывает тултипы подсказки у поля
         *
         * @method
         * @returns {undefined}
         */
        hideHelper: function () {
            var $this = $(this),
                controlStatusData = $this.data('controlStatus');

            if (!(controlStatusData && controlStatusData.helperIsShowing)) {
                return;
            }

            $this.data('controlStatus', _.extend(controlStatusData, {
                helperIsShowing: false
            }));

            $this.siblings('.form-group-status').
                slideUp();
        },

        /**
         * Метод отображает ошибку у поля
         *
         * @method
         * @param {String} error текст ошибки
         * @returns {jQuery}
         */
        error: function (error) {
            return this.each(function () {
                var $this = $(this),
                    controlStatusData = $this.data('controlStatus'),
                    $formGroup = $this.parent(),
                    $groupStatus = $('.form-group-status', $formGroup);

                $formGroup.removeClass('has-success');
                $formGroup.addClass('has-error');
                $groupStatus.html(error);

                if (!(controlStatusData && controlStatusData.helperIsShowing)) {
                    $groupStatus.slideDown();
                }

                $this.data('controlStatus', _.extend(controlStatusData, {
                    helperIsShowing: true,
                    status: 'error'
                }));
            });
        },

        /**
         * Метод устаналивает поле в состояние успех
         *
         * @method
         * @returns {jQuery}
         */
        success: function () {
            return this.each(function () {
                var $this = $(this),
                    controlStatusData = $this.data('controlStatus'),
                    $formGroup = $this.parent(),
                    $groupStatus = $('.form-group-status', $formGroup);

                $formGroup.removeClass('has-error');
                $formGroup.addClass('has-success');
                $groupStatus.html(controlStatusData.successTitle);

                if (!(controlStatusData && controlStatusData.helperIsShowing)) {
                    $groupStatus.slideDown();
                }

                $this.data('controlStatus', _.extend(controlStatusData, {
                    status: 'success'
                }));
            });
        },

        /**
         * Метод устанавливает поле в дефолтное состояние
         *
         * @method
         * @returns {jQuery}
         */
        base: function () {
            return this.each(function () {
                var $this = $(this),
                    controlStatusData = $this.data('controlStatus'),
                    $formGroup = $this.parent();

                $formGroup.removeClass('has-error');
                $formGroup.removeClass('has-success');
                methods.hideHelper.call(this);
                $this.data('controlStatus', _.extend(controlStatusData, {
                    status: null
                }));
            });
        },

        /**
         * Метод удалет все слушатели и чистит все за плагином
         *
         * @method
         * @returns {jQuery}
         */
        destroy: function () {
            return this.each(function () {
                var $this = $(this),
                    $formGroup = $this.parent();

                $this.removeData('controlStatus');
                $formGroup.removeClass('has-feedback');
                $('.form-group-status', $formGroup).remove();
                $('.form-control-feedback', $formGroup).remove();
            });
        }
    };

    $.fn.controlStatus = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }

        if (typeof method === 'object' || !method) {
            return methods.initialize.apply(this, arguments);
        }

        return $.error('Метод с именем ' + method + ' не существует для jQuery.controlStatus');

    };
});