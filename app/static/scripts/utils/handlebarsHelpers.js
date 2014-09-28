'use strict';

(function (Soshace) {
    var Handlebars = Soshace.Handlebars,
        _ = Soshace._;

    /**
     * Вспомогательные методы для шаблонизатора
     * Handlebars
     *
     * @module HandlebarsHelpers
     */
    /**
     * Метод перевода
     */
    Handlebars.registerHelper('i18n', _.bind(Soshace.helpers.i18n, Soshace.helpers));

    /**
     * Метод отображает дату в формате 'mm.dd.yyyy'
     */
    Handlebars.registerHelper('formatDate', function (notFormattedDate) {
        var dateObject = new Date(notFormattedDate),
            date = dateObject.getDate(),
            month = dateObject.getMonth() + 1,
            year = dateObject.getFullYear();

        date = Soshace.helpers.zeroLeading(date);
        month = Soshace.helpers.zeroLeading(month);

        return [date, month, year].join('.');
    });
})(window.Soshace);