'use strict';

define([
    'jquery',
    'underscore',
    'views/admin/postReView',
    'config'
], function (
    $,
    _,
    PostReview) {

    if($('.js-post-review').length){
        new PostReview();
    }
});



