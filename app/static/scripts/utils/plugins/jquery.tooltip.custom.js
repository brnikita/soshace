'use strict';

define([
    'jquery',
    'underscore',
    'utils/helpers',
    'bootstrap'
], function ($, _, Helpers) {
    $.fn.showErrorTooltip = function (params) {
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
                    params.trigger = 'manual';

                    if (params.type === 'error') {
                        methods.errorTooltip();
                    }
                },

                /**
                 * Метод показывает тултип с ошибкой
                 *
                 * @method
                 * @returns {undefined}
                 */
                errorTooltip: function () {
                    Helpers.renderTemplate('utils/plugins/errorTooltip', {
                        width: 200
                    }).done(function (template) {
                        tooltipParams = _.extend(tooltipParams, {
                            template: template,
                            html: true
                        });
                        $elementWithTooltip.tooltip(
                            tooltipParams
                        ).tooltip('show');
                    });
                }
            };

        params = _.extend(params, {type: 'error'});
        return methods.initialize.call(this, params);
    };
});