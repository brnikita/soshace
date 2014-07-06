'use strict';

define([
    'jquery',
    'underscore',
    'utils/helpers',
    'bootstrap'
], function ($, _, Helpers) {
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

    $.fn.helperTooltip = function (params) {
        var $this = $(this);

        Helpers.renderTemplate('utils/plugins/helperTooltip', {
            width: 200
        }).done(function (template) {
            params = _.extend(params, {
                template: template,
                trigger: 'focus',
                html: true
            });
            $this.
                tooltip(
                params
            );
        });
    }
});