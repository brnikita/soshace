'use strict';

var Fs = require('fs'),
    Crypto = require('crypto'),
    _ = require('underscore'),
    Gm = require('gm').subClass({
        imageMagick: true
    });

/**
 * Контроллер, отвечающий за загрузку изображений
 *
 * @module UploadImageController
 *
 */
var UploadImageController = {

    /**
     * Формат изображений, в котором мы записываем их на диск
     *
     * @field
     * @name UploadImageController.outputFormat
     * @type {string}
     */
    outputFormat: 'png',

    /**
     * Максимальная ширина изображения
     *
     * @field
     * @name UploadImageController.imageMaxWidth
     * @type {string}
     */
    imageMaxWidth: '1140',

    /**
     * Максимальная высота изображения
     *
     * @field
     * @name UploadImageController.imageMaxHeight
     * @type {string}
     */
    imageMaxHeight: '800',

    /**
     * Метод возвращает будущий адрес картинки на диске
     *
     * @method
     * @name UploadImageController.getUniqueImageName
     * @param {string | Buffer} imageData тело картинки
     * @returns {Object} возвращает объект, содержащий
     *                   внешний и локальный путь до картинки
     */
    getImagePath: function (imageData) {
        var md5sum = Crypto.createHash('md5'),
            newImageName,
            webImgUrl,
            localImagePath;

        md5sum.update(imageData);
        newImageName = md5sum.digest('hex') + '.' + this.outputFormat;

        if (Soshace.ENVIRONMENT === 'development') {
            webImgUrl = '/media/' + newImageName;
        }

        if (Soshace.ENVIRONMENT === 'production') {
            webImgUrl = Soshace.PRODUCTION_DOMAIN + 'media/' + newImageName;
        }

        localImagePath = Soshace.MEDIA_DIRECTORY + newImageName;

        return {
            webImgUrl: webImgUrl,
            localImagePath: localImagePath
        };
    },

    /**
     * @method
     * @name UploadImageController.upload
     * @param {Object} request
     * @param {Object} response
     * @returns {undefined}
     */
    upload: function (request, response) {

        var imageParams = request.files.image,
            imagePath = imageParams.path,
            imageName = imageParams.originalFilename;

        Fs.readFile(imagePath, _.bind(function (error, data) {
            if (error) {
                response.send({
                    error: error,
                    path: null
                });

                return;
            }

            var imagePathData = this.getImagePath(data),
                imgUrl = imagePathData.webImgUrl,
                localPath = imagePathData.localImagePath;

            void new Gm(data, imageName).
                setFormat(this.outputFormat).
                resize(this.imageMaxWidth, this.imageMaxHeight, '>').
                write(localPath, function (error) {
                    if (error) {
                        response.send({
                            error: error,
                            path: null
                        });

                        return;
                    }

                    response.send({
                        error: null,
                        path: imgUrl
                    });
                });

        }, this));
    }
};

_.bindAll(UploadImageController, 'upload');
module.exports = UploadImageController;