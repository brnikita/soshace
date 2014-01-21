'use strict';

//Импортируем глобальный объект soshace
require('./config');

var Express = require('express'),
    Package = require('../../package'),
    App = new Express(),
    DbConnection = require('./common/dbConnection').DbConnection,
    Router = require('./common/router').Router;

var Worker = {
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
        App.configure(function () {
            App.use(Express.bodyParser());
            App.set('views', 'app/src/views');
            App.set('view engine', 'jade');
        });
    }
};

Worker._init();
