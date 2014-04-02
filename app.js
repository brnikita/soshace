'use strict';

//Импортируем глобальный объект soshace
require('./app/config');

var Express = require('express'),
    Package = require('./package'),
    App = new Express(),
    DbConnection = require('./app/src/common/dbConnection'),
    I18n = require('i18n-2'),
    Router = require('./app/src/router');

var Blog = {
    /**
     * Инициализируем приложение
     *
     * @private
     * @function
     * @name Worker.init
     * @return {undefined}
     */
    _init: function () {
        soshace.VERSION = Package.version;
        soshace.ENVIRONMENT = App.get('env');
        this._configure();
        //Подрубаемся к базе
        DbConnection.databaseOpen(function () {
            Router.init(App);
            App.listen(soshace.PORT, soshace.HOST);
        });

    },

    /**
     * Конфигурируем наше приложение
     *
     * @private
     * @function
     * @name Worker.configure
     * @return {undefined}
     */
    _configure: function () {
        App.use(Express.bodyParser());
        App.set('views', 'app/src/views');
        App.set('view engine', 'jade');

        //Конфигурируем локали
        I18n.expressBind(App, {
            locales: soshace.LOCALES,
            directory: 'app/src/locales',
            extension: '.json',
            defaultLocale: soshace.DEFAULT_LOCALE
        });

        //Хелперы
        App.use(function (request, response, next) {
            response.locals.__ = function (value) {
                return request.i18n.__(value);
            };
            next();
        });

        App.use(App.router);

        //Устанавливаем ответ для 404
        App.use(function (request, response) {
            response.status(404);

            // respond with html page
            if (request.accepts('html')) {
                response.render('404', { url: request.url });
                return;
            }

            // respond with json
            if (request.accepts('json')) {
                response.send({ error: 'Not found' });
                return;
            }

            // default to plain-text. send()
            response.type('txt').send('Not found');
        });
    }
};

Blog._init();