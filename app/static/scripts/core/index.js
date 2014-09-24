'use strict';

/**
 * Ядро приложения
 *
 * Содержит основные классы для создания MVC приложения
 *
 * API классов моделей, видов, коллекций схоже с API Backbone
 *
 * @module Core
 */

define([
    'underscore',
    './class',
    './event',
    './deferred',
    './ajax',
    './model',
    './validation',
    './view',
    './collection',
    './controller',
    './history',
    './router'
], function (_, Class, Event, Deferred, Ajax, Model, Validation, View, Collection, Controller, History, Router) {
    var Global = this.Soshace,
        Core = {
            /**
             * Базовый класс
             *
             * @field
             * @name Soshace.Core.Class
             * @type {Class}
             */
            Class: Class,

            /**
             * Класс событий
             *
             * @field
             * @name Soshace.Core.Event
             * @type {Event}
             */
            Event: Event,

            /**
             * @field
             * @name Soshace.Core.Deferred
             * @type {Event}
             */
            Deferred: Deferred,

            /**
             * @field
             * @name Soshace.Core.Model
             * @type {Event}
             */
            Ajax: Ajax,

            /**
             * @field
             * @name Soshace.Core.Ajax
             * @type {Event}
             */
            Model: Model,

            /**
             * @field
             * @name Soshace.Core.Validation
             * @type {Event}
             */
            Validation: Validation,

            /**
             * @field
             * @name Soshace.Core.View
             * @type {Event}
             */
            View: View,

            /**
             * @field
             * @name Soshace.Core.Collection
             * @type {Event}
             */
            Collection: Collection,

            /**
             * @field
             * @name Soshace.Core.Controller
             * @type {Event}
             */
            Controller: Controller,

            /**
             * @field
             * @name Soshace.Core.History
             * @type {Event}
             */
            History: History,

            /**
             * @field
             * @name Soshace.Core.Router
             * @type {Event}
             */
            Router: Router
        };

    if (_.isUndefined(Global)) {
        this.Soshace = {};
    }

    if (_.isUndefined(Global.Core)) {
        this.Soshace.Core = Core;
    }

    return Core;
});