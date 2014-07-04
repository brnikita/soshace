'use strict';

define([
    'jquery',
    'underscore',
    'bootstrap'
], function ($, _) {
    var $elementWithTooltip,
        tooltipParams,
        methods = {

            /**
             * @constructor
             * @param {Object} params параметры тултипа
             * @returns {undefined}
             */
            initialize: function (params) {
                $elementWithTooltip = $(this);
                tooltipParams = params;
                debugger;
                if (params.type === 'error') {
                    methods.errorTooltip();
                    return;
                }
            },

            /**
             * Метод показывает тултип с ошибкой
             *
             * @method
             * @returns {undefined}
             */
            errorTooltip: function () {
                debugger;
                tooltipParams = _.extend(tooltipParams, {
                    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div>' +
                        '<div class="tooltip-inner"></div></div>'
                });
                $elementWithTooltip.tooltip(
                    tooltipParams
                ).tooltip('show');
            }
        };

    $.fn.showErrorTooltip = function (params) {
        params = _.extend(params, {type: 'error'});
        return methods.initialize.call(this, params);
    };
});