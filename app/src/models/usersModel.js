'use strict';

var Mongoose = require('mongoose');

/**
 *  Объект для работы с моделью пользователей
 */
var UsersModel = {
    /**
     * Объект модели пользователей
     *
     * @field
     * @name UsersModel.model
     * @type {Mongoose.model}
     */
    model: null,

    /**
     * Инициализациия модели
     *
     * @method
     * @name UsersModel.initialize
     * @returns {undefined}
     */
    initialize: function () {
        if (this.model === null) {
            var UsersSchema = Mongoose.Schema({
                fullName: String,
                email: String,
                isMale: Boolean,
                password: String,
                emailConfirmed: Boolean
            });

            this.model = Mongoose.model('Users', UsersSchema);
        }
    }
};

UsersModel.initialize();
module.exports = UsersModel;