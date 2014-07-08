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
         * @param {Object} options
         * @returns {jQuery}
         */
        initialize: function (options) {
            return this.each(function () {
                var $this = $(this),
                    helperOptions = options.helperOptions;

                if (helperOptions) {
                    $this.data('controlStatus', {
                        helperOptions: helperOptions
                    });

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
         * @private
         * @method
         * @returns {undefined}
         */
        _showHelper: function () {
            var $this = $(this),
                data = $this.data('controlStatus');

            if (data.helperIsShowing) {
                return;
            }

            $this.data('controlStatus', {
                helperIsShowing: true
            });

            Helpers.renderTemplate('utils/plugins/controlStatus/helperTooltip', {
                width: 200
            }).done(function (template) {
                    var helperOptions = data && data.helperOptions || {};
                    $this.removeClass('field-error');
                    $this.
                        tooltip('destroy').
                        tooltip(_.extend({
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
            var $this = $(this);

            $this.data('controlStatus', {
                helperIsShowing: false
            });
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
                    data = $this.data('controlStatus');

                $this.addClass('field-error');
                $this.data('controlStatus', {
                    helperIsShowing: false
                });
                Helpers.renderTemplate('utils/plugins/controlStatus/errorTooltip', {
                    width: 200
                }).done(function (template) {
                        var errorOptions = data && data.errorOptions || {};
                        $this.
                            tooltip('destroy').
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
                var $this = $(this);

                if ($this.hasClass('field-error')) {
                    $this.removeClass('field-error');
                    $this.tooltip('destroy');
                }

                $this.addClass('field-success');
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
                var $this = $(this);

                if ($this.hasClass('field-error')) {
                    $this.removeClass('field-error');
                    $this.tooltip('destroy');
                }

                $this.removeClass('field-success');
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