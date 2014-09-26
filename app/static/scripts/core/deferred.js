'use strict';

/**
 * Класс деферред объектов
 *
 * @module Deferred
 */
define(['./class'], function (Class) {
    /**
     * @class Deferred
     */
    return Class.extend({
        /**
         * Список успешных колбеков
         *
         * @private
         * @field
         * @name Deferred#_callbacksListSuccess
         * @type {Array | null}
         */
        _callbacksListSuccess: null,

        /**
         * Список неудачных колбеков
         *
         * @private
         * @field
         * @name Deferred#_callbacksListFail
         * @type {Array | null}
         */
        _callbacksListFail: null,

        /**
         * Resolve a Deferred object and call any doneCallbacks with the given args.
         *
         * @public
         * @method
         * @name Deferred#resolve
         * @returns {Deferred}
         */
        resolve: function () {
            var i,
                successList = this._callbacksListSuccess;

            for (i = 0; i < successList.length; i ++) {
                successList[i].apply(this, arguments);
            }

            return this;
        },

        /**
         * Reject a Deferred object and call any failCallbacks with the given args.
         *
         * @public
         * @method
         * @name Deferred#reject
         * @returns {Deferred}
         */
        reject: function () {
            var i,
                failList = this._callbacksListFail;

            for (i = 0; i < failList.length; i ++) {
                failList[i].apply(this, arguments);
            }

            return this;
        },

        /**
         * Add handlers to be called when the Deferred object is resolved.
         *
         * @public
         * @method
         * @name Deferred#done
         * @param {Function} callback
         * @returns {Deferred}
         */
        done: function (callback) {
            if (this._callbacksListSuccess === null) {
                this._callbacksListSuccess = [];
            }

            this._callbacksListSuccess.push(callback);
            return this;
        },

        /**
         * Add handlers to be called when the Deferred object is rejected.
         *
         * @public
         * @method
         * @name Deferred#fail
         * @param {Function} callback
         * @returns {Deferred}
         */
        fail: function (callback) {
            if (this._callbacksListFail === null) {
                this._callbacksListFail = [];
            }

            this._callbacksListFail.push(callback);
            return this;
        },

        /**
         * Метод добавляет обработчик, который выполнится в любом случае
         *
         * @public
         * @method
         * @name Deferred#always
         * @param {Function} callback
         * @returns {Deferred}
         */
        always: function(callback){
            this.done(callback).fail(callback);
            return this;
        }
    }, {
        /**
         * Метод ожидает выполнения всех переданных деферред объектов
         * В callback передается список всех результатов
         *
         * Параметры:
         * deferred1, deferred2, deferred3, ..., callback
         *
         * @public
         * @method
         * @name Deferred.when
         * @returns {Deferred}
         */
        when: function () {

        }
    });
});