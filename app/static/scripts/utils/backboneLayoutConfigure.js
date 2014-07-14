'use strict';
require([
    'jquery',
    'underscore',
    'handlebars',
    'backbone',
    'config',
    'backbone.layoutmanager'
], function ($, _, Handlebars, Backbone) {
    Backbone.Layout.configure({
        /**
         * @field
         * @type {boolean}
         */
        manage: false,

        /**
         * @field
         * @type {string}
         */
        prefix: Soshace.viewsPath,

        /**
         * Метод загружает партиал по пути
         *
         * @method
         * @param {string} partialName имя партиала
         * @returns {jQuery.Deferred}
         */
        fetchPartial: function (partialName) {
            var deferred = $.Deferred(),
                hbs = Soshace.hbs,
                path;

            path = this.prefix + 'partials/' + partialName + '.hbs';

            if (hbs[path]) {
                return deferred.resolve(hbs[path]);
            }

            $.get(path, function (contents) {
                var template = Handlebars.compile(contents);

                Handlebars.registerPartial(partialName, template);
                hbs[path] = template;
                deferred.resolve(template);
            }, 'text');

            return deferred;
        },

        /**
         * @method
         * @param {string} path путь до шаблона
         * @returns {string | undefined}
         */
        fetchTemplate: function (path) {
            // Check for a global JST object.  When you build your templates for
            // production, ensure they are all attached here.
            var hbs = Soshace.hbs,
                done;

            path += '.hbs';

            // If the path exists in the object, use it instead of fetching remotely.
            if (hbs[path]) {
                return hbs[path];
            }

            // If it does not exist in the JST object, mark this function as
            // asynchronous.
            done = this.async();

            // Fetch via jQuery's GET.  The third argument specifies the dataType.
            $.get(path, function (contents) {
                var template = Handlebars.compile(contents);

                hbs[path] = template;
                done(template);
            }, 'text');
        }
    });
});