'use strict';

var fs = require('fs');

/**
 * Контроллер, отвечающий за загрузку изображений
 *
 * @module UploadImageController
 *
 */
module.exports = {

    /**
     * @method
     * @name UploadImageController.upload
     * @param {Object} request
     * @param {Object} response
     */
    upload: function (request, response) {
        fs.readFile(request.files.image.path, function (err, data) {

            var imageName = request.files.image.name,
                newPath;

            /// If there's an error
            if (!imageName) {

                console.log('There was an error');
                response.redirect('/');
                response.end();

            } else {
                newPath = __dirname + '/uploads/fullsize/' + imageName;

                /// write file to uploads/fullsize folder
                fs.writeFile(newPath, data, function (error) {

                    /// let's see it
                    response.redirect('/uploads/fullsize/' + imageName);

                });
            }
        });
    }
};


