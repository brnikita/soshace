'use strict';

/**
 * Класс деферред объектов
 *
 * @module Deferred
 */
define(['underscore', './class'], function (_, Class) {
    /**
     * @class Deferred
     */
    var Deferred = Class.extend({
        /**
         * Флаг, означающий, что метод resolve уже вызван
         *
         * @private
         * @field
         * @name Deferred#resolved
         * @type {boolean}
         */
        _resolved: false,

        /**
         * Флаг, означающий, что метод reject уже вызван
         *
         * @private
         * @field
         * @name Deferred#rejected
         * @type {boolean}
         */
        _rejected: false,

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

            this._resolved = true;

            if (_.isNull(successList)) {
                return this;
            }

            for (i = 0; i < successList.length; i++) {
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

            this._rejected = true;

            if (_.isNull(failList)) {
                return this;
            }

            for (i = 0; i < failList.length; i++) {
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
            if (this._resolved) {
                callback();
                return this;
            }

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
            if (this._rejected) {
                callback();
                return this;
            }

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
        always: function (callback) {
            return this.done(callback).fail(callback);
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
            var whenArguments = arguments,
                responsesCount = 0,
                whenDeferred = new Deferred(),
                responsesList = [];

            _.each(whenArguments, _.bind(function (deferred, index) {
                deferred.always(function (response) {
                    responsesList[index] = response;
                    responsesCount++;

                    if (responsesCount === whenArguments.length) {
                        whenDeferred.resolve.apply(this, responsesList);
                    }
                });
            }, this));

            return whenDeferred;
        }
    });

    return Deferred;
});