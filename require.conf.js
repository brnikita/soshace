require.config(
    {
        baseUrl: '/static/scripts/',
        paths: {
            'underscore': 'plugins/underscoreSmall',
            'handlebars': 'vendors/handlebars',
            'google-analytics': 'vendors/google-analytics',
            'yandex-metrika': 'vendors/yandex-metrika'
        },
        shim: {
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