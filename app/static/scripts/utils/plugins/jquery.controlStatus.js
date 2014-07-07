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
         * @returns {undefined}
         */
        initialize: function (options) {
            return this.each(function () {
                var $this = $(this),
                    helperText = options.helperText;

                if (helperText) {
                    $this.data('controlStatus', {
                        helperText: options.helperText
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
        _addHelperListeners: function(){
            this.on('focus keyup', methods._showHelper);
            this.on('blur', methods._hideHelper);
        },

        /**
         * @private
         * @method
         * @returns {undefined}
         */
        _showHelper: function(){
            var $this = $(this),
                data  = $this.data('controlStatus');

            if(data.helperIsShowing){
                return;
            }

            $this.data('controlStatus', {
                helperIsShowing: true
            });
        },

        /**
         * @method
         * @private
         */
        _hideHelper: function(){

        }


    };

    $.fn.showErrorTooltip = function (params) {
        var $this = $(this);

        Helpers.renderTemplate('utils/plugins/errorTooltip', {
            width: 200
        }).done(function (template) {
                params = _.extend(params, {
                    template: template,
                    trigger: 'manual',
                    html: true
                });
                $this.
                    tooltip('destroy').
                    tooltip(
                        params
                    ).tooltip('show');
            });
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