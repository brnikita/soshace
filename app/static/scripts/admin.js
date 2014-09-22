'use strict';

define([
    'zepto',
    'plugins/underscoreSmall',
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



