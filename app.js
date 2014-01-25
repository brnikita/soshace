'use strict';

//Импортируем глобальный объект soshace
require('./app/src/config');

var Express = require('express'),
    Package = require('./package'),
    App = new Express(),
    DbConnection = require('./app/src/common/dbConnection').DbConnection,
    Router = require('./app/src/common/router').Router;

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
        App.configure(function () {
            App.use(Express.bodyParser());
            App.set('views', 'app/src/views');
            App.set('view engine', 'jade');
        });
    }
};

Blog._init();