'use strict';
//TODO: добавить trim перед сохранением полей

var _ = require('underscore'),
    Mongoose = require('mongoose'),
    Schema = Mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Bcrypt = require('bcrypt'),
    Validators = srcRequire('common/validators'),
    Helpers = srcRequire('common/helpers'),

    /**
     * Class for password resetting
     * (storing temporary hashes)
     *
     * @class
     * @name UsersShema
     * @type {Schema}
     */
    ResetPasswordSchema = new Schema({
        code: {
            type: String,
            readonly: true,
            default: null
        },
        timestamp: {
            type: Date,
            default: null,
            readOnly: true
        },
        userId: {
            type: ObjectId,
            default: null,
            readOnly: true
        }
    });

module.exports = Mongoose.model('passwordReset', ResetPasswordSchema);