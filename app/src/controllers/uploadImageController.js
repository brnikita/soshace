'use strict';

var Fs = require('fs'),
    Crypto = require('crypto'),
    _ = require('underscore');

/**
 * Контроллер, отвечающий за загрузку изображений
 *
 * @module UploadImageController
 *
 */
var UploadImageController = {

    /**
     * Метод возвращает уникальное название картинки
     *
     * @method
     * @name UploadImageController.getUniqueImageName
     * @param {string | Buffer} imageData тело картинки
     * @returns {string}
     */
    getUniqueImageName: function (imageData) {
        var md5sum = Crypto.createHash('md5'),
            newImageName;

        md5sum.update(imageData);
        newImageName = md5sum.digest('hex');
        return newImageName;
    },

    /**
     * @method
     * @name UploadImageController.writeImageOnDisk
     * @param {string | Buffer} imageData тело картинки
     * @param {Function} callback(error, imgUrl) метод возвращает ошибку и url до картинки
     * @returns {undefined}
     */
    writeImageOnDisk: function (imageData, callback) {
        var imageName,
            localPath,
            imgUrl;

        if (imageData) {
            imageName = this.getUniqueImageName(imageData);
            localPath = soshace.MEDIA_DIRECTORY + imageName;

            //Записываем картинку на диск
            Fs.writeFile(localPath, imageData, function () {
                if (soshace.ENVIRONMENT === 'development') {
                    imgUrl = '/media/' + imageName;
                }

                if (soshace.ENVIRONMENT === 'production') {
                    imgUrl = soshace.PRODUCTION_DOMAIN + 'media/' + imageName;
                }

                callback(null, imgUrl);
            });
        } else {
            callback( 'Invalid file', null);
        }
    },

    /**
     * @method
     * @name UploadImageController.upload
     * @param {Object} request
     * @param {Object} response
     * @returns {undefined}
     */
    upload: function (request, response) {

        Fs.readFile(request.files.image.path, _.bind(function (error, data) {

            this.writeImageOnDisk(data, function (error, path) {
                response.send({
                    error: error,
                    path: path
                });
            });

        }, this));
    }
};

_.bindAll(UploadImageController, 'upload');
module.exports = UploadImageController;