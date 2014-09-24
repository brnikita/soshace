'use strict';

define([
    'jquery',
    'underscore',
    'global',
    'views/admin/postReView'
], function (
    $,
    _,
    Soshace,
    PostReview) {

    if($('.js-post-review').length){
        new PostReview();
    }
});



