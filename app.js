'use strict';

//Импортируем глобальный объект soshace
require('./app/config');

var _ = require('underscore'),
    Express = require('express'),
    Package = require('./package'),
    App = new Express(),
    DbConnection = require('./app/src/common/dbConnection'),
    I18n = require('i18n-2'),
    Router = require('./app/src/router'),
    Passport = require('passport'),
    Strategies = require('./app/src/common/strategies'),
    Handlebars = require('express3-handlebars');

var Blog = {
    /**
     * Инициализируем приложение
     *
     * @private
     * @function
     * @name Blog.initialize
     * @return {undefined}
     */
    initialize: function () {
        Soshace.DIR_NAME = __dirname;
        Soshace.VERSION = Package.version;
        Soshace.IS_PRODUCTION = App.get('env') === 'production';
        this.configure();
        //Подрубаемся к базе
        DbConnection.databaseOpen(_.bind(function () {
            Strategies.localStrategy();
            new Router(App);
            App.listen(Soshace.PORT, Soshace.HOST);
        }, this));

    },

    /**
     * Конфигурируем наше приложение
     *
     * @method
     * @name Blog.configure
     * @return {undefined}
     */
    configure: function () {
        App.use(Express.bodyParser());
        App.enable('view cache');
        App.set('views', 'app/views/');
        App.engine('hbs', new Handlebars({
            layoutsDir: 'app/views/layouts',
            partialsDir: 'app/views/partials',
            defaultLayout: 'layoutView',
            extname: '.hbs'
        }));

        App.set('view engine', 'hbs');
        I18n.expressBind(App, {
            locales: Soshace.LOCALES,
            directory: 'app/locales',
            extension: '.json',
            defaultLocale: Soshace.DEFAULT_LOCALE
        });

        App.use(Express.cookieParser());
        App.use(Express.bodyParser());
        App.use(Express.methodOverride());
        App.use(Express.session({ secret: Soshace.SESSION_KEY }));
        App.use(Passport.initialize());
        App.use(Passport.session());
        App.use(App.router);

        //Устанавливаем ответ для 404
        App.use(this.notFoundHandler);
    },

    /**
     * Обработчик ошибки 404
     *
     * @method
     * @name Blog.notFoundHandler
     * @param {Object} request
     * @param {Object} response
     * @returns {undefined}
     */
    notFoundHandler: function (request, response) {
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
    }
};

Blog.initialize();