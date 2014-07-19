'use strict';

/**
 * TODO: доделать!!!
 *
 * Модуль будет содержать все сторонние зависимости
 *
 * @module Vendors
 */
define([
    './underscore',
    './jquery',
    './backbone'
], function (_, $, Backbone) {
    return {
        _: _,
        $: $,
        Backbone: Backbone
    };
});