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
    LocalStrategy = require('passport-local').Strategy,
    strategies = require('./app/src/controllers/auth/strategiesController'),
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
            this.passportStrategies();
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

        App.use(Passport.initialize());
        App.use(Passport.session());
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
    },

    /**
     * Конфигурирем утентификацию через соц. сети
     * и нашу форму логина
     *
     * @method
     * @name Blog.passportStrategies
     * @return {undefined}
     */
    passportStrategies: function () {
        Passport.serializeUser(strategies.serializeUser);
        Passport.deserializeUser(strategies.deSerializeUser);

        //Конфигурируем утентификацию через форму логина
        Passport.use(new LocalStrategy({
            usernameField: 'email'
        }, strategies.local));
    }
};

Blog.initialize();