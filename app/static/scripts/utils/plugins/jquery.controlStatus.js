/**
 * Плагин для показа ошибок, подсказок у полей и
 * отображения успешных полей
 */

'use strict';

define([
    'jquery',
    'underscore',
    'utils/helpers',
    'bootstrap'
], function ($, _, Helpers) {
    var methods = {
        /**
         * @constructor
         * @param {Object} [options]
         * @returns {jQuery}
         */
        initialize: function (options) {
            return this.each(function () {
                var $this = $(this);

                if (options) {
                    $this.data('controlStatus', options);
                    methods._addHelperListeners.call(this);
                }
            });
        },

        /**
         * Метод добавляет слушатели на элемент, если есть подсказка
         * у поля
         *
         * @private
         * @method
         * @returns {undefined}
         */
        _addHelperListeners: function () {
            var $this = $(this);
            $this.on('focus keyup', methods._showHelper);
            $this.on('blur', methods._hideHelper);
        },

        /**
         * Метод удаляет слушатели с элемента
         *
         * @private
         * @method
         * @returns {undefined}
         */
        _removeHelperListeners: function () {
            var $this = $(this);
            $this.off('focus keyup', methods._showHelper);
            $this.off('blur', methods._hideHelper);
        },

        /**
         * Метод показывает тултип подсказки у поля
         *
         * @private
         * @method
         * @returns {undefined}
         */
        _showHelper: function () {
            var $this = $(this),
                controlStatusData = $this.data('controlStatus'),
                $formGroup = $this.parent(),
                helperOptions;

            if (!(controlStatusData && controlStatusData.helperOptions)) {
                return;
            }

            if ($formGroup.hasClass('has-success')) {
                return;
            }

            if (controlStatusData.helperIsShowing) {
                return;
            }

            $this.data('controlStatus', _.extend(controlStatusData, {
                helperIsShowing: true
            }));

            if ($formGroup.hasClass('has-error')) {
                $formGroup.removeClass('has-error');
                $this.tooltip('destroy');
            }

            helperOptions = controlStatusData && controlStatusData.helperOptions || {};
            //TODO: переделать на блоки под полем
            Helpers.renderTemplate('utils/plugins/controlStatus/helperTooltip', helperOptions).
                done(function (template) {
                    $this.tooltip(_.extend({
                        template: template,
                        trigger: 'manual',
                        placement: 'right',
                        html: true
                    }, helperOptions)).tooltip('show');
                });
        },

        /**
         * Метод скрывает тултипы подсказки у поля
         *
         * @private
         * @method
         * @returns {undefined}
         */
        _hideHelper: function () {
            var $this = $(this),
                controlStatusData = $this.data('controlStatus');

            if (!(controlStatusData && controlStatusData.helperIsShowing)) {
                return;
            }

            $this.data('controlStatus', _.extend(controlStatusData, {
                helperIsShowing: false
            }));
            $this.tooltip('destroy');
        },

        /**
         * Метод отображает ошибку у поля
         *
         * @method
         * @returns {jQuery}
         */
        error: function (error) {
            return this.each(function () {
                var $this = $(this),
                    $formGroup = $this.parent(),
                    controlStatusData = $this.data('controlStatus'),
                    errorOptions;

                $formGroup.addClass('has-error');
                $formGroup.removeClass('has-success');
                methods._hideHelper.call(this);

                errorOptions = controlStatusData && controlStatusData.errorOptions || {};
                //TODO: переделать на блоки под полем
                Helpers.renderTemplate('utils/plugins/controlStatus/errorTooltip', errorOptions).
                    done(function (template) {
                        $this.
                            tooltip(_.extend({
                                template: template,
                                trigger: 'manual',
                                title: error,
                                placement: 'right',
                                html: true
                            }, errorOptions)).tooltip('show');
                    });

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
                    $formGroup = $this.parent();

                if ($formGroup.hasClass('has-error')) {
                    $formGroup.removeClass('has-error');
                    $this.tooltip('destroy');
                }

                methods._hideHelper.call(this);
                $formGroup.addClass('has-success');
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
                    $formGroup = $this.parent();

                if ($formGroup.hasClass('has-error')) {
                    $formGroup.removeClass('has-error');
                    $this.tooltip('destroy');
                }

                $formGroup.removeClass('has-success');
                methods._showHelper.call(this);
            });
        },

        /**
         * Метод переключает состояния поля в зависимости от флага
         *
         * @method
         * @param {Boolean} flag если true - success, false - base
         * @returns {jQuery}
         */
        toggleSuccessBase: function (flag) {
            return flag ? methods.success.call(this) : methods.base.call(this);
        },

        /**
         * Метод удалет все слушатели и чистит все за плагином
         *
         * @method
         * @returns {jQuery}
         */
        destroy: function () {
            return this.each(function () {
                var $this = $(this);
                $this.tooltip('destroy');
                $this.removeData('controlStatus');
                methods._removeHelperListeners.call(this);
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