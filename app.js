'use strict';

//Импортируем глобальный объект soshace
require('./app/config');

global.srcRequire = function (name) {
    return require(__dirname + '/app/src/' + name);
};

var _ = require('underscore'),
    express = require('express'),
    packageJson = require('./package'),
    clientScripts = require('./clientScripts'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    App = express(),
    DbConnection = srcRequire('common/dbConnection'),
    I18n = require('i18n-2'),
    Router = srcRequire('router'),
    Passport = require('passport'),
    Template = srcRequire('template/expressTemplate'),
    Strategies = srcRequire('common/strategies'),
    Class = srcRequire('common/class'),
    methodOverride = require('method-override'),
    MongoStore = require('connect-mongo')(session);

var Blog = Class.extend({
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
        Soshace.VERSION = packageJson.version;
        Soshace.SCRIPTS_LIST = clientScripts.scripts;
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
        var template = new Template({
            defaultLayout: 'app/views/layouts/layout.hbs'
        });
        App.use(bodyParser.json());
        App.use(cookieParser());
        App.use(methodOverride());
        App.enable('view cache');
        App.set('views', 'app/views/');
        App.engine('hbs', _.bind(template.engine, template));

        App.set('view engine', 'hbs');
        I18n.expressBind(App, {
            locales: Soshace.LOCALES,
            directory: 'app/locales',
            extension: '.json',
            defaultLocale: Soshace.DEFAULT_LOCALE
        });

        App.use(session({
            secret: Soshace.SESSION_KEY,
            saveUninitialized: true,
            resave: true,
            store: new MongoStore({
                db: 'soshace'
            })
        }));
        App.use(Passport.initialize());
        App.use(Passport.session());
    }
});

void new Blog();