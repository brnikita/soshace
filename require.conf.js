require.config(
    {
        baseUrl: '/static/scripts/',
        paths: {
            'underscore': 'plugins/underscoreSmall',
            'handlebars': 'vendors/handlebars',
            'google-analytics': 'vendors/google-analytics',
            'yandex-metrika': 'vendors/yandex-metrika',
            'jquery.cookie': 'vendors/jquery/jquery.cookie',
            'backbone': 'vendors/backbone',
            'backbone.layoutmanager': 'vendors/backbone/backbone.layoutmanager',
            'backbone.validation': 'vendors/backbone/backbone.validation'

        },
        shim: {
            'jquery.cookie': {
                deps: [
                    'jquery'
                ]
            },
            'backbone': {
                deps: [
                    'jquery',
                    'underscore'
                ],
                exports: 'Backbone'
            },
            'backbone.layoutmanager': {
                deps: [
                    'backbone'
                ]
            },
            'handlebars': {
                exports: 'Handlebars'
            },
            'class': {
                exports: 'Class'
            }
        },
        deps: [
            'app'
        ]
    }
);