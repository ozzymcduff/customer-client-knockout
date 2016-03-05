/**
 * Application configuration declaration.
 */
require.config({

    baseUrl: 'scripts/',

    paths: {
        //main libraries
        jquery: '../bower_components/jquery/dist/jquery.min',
        lodash: '../bower_components/lodash/dist/lodash.min',
        knockout: '../bower_components/knockout/dist/knockout',
        template: '../bower_components/knockout-require-templates/template',
        stringTemplateEngine: '../bower_components/knockout-require-templates/stringTemplateEngine',
        bluebird: '../bower_components/bluebird/js/browser/bluebird.min',

        //shortcut paths
        templates: '../templates',
        data: '../data',

        //require plugins
        text: '../bower_components/requirejs-text/text',
        tpl: '../bower_components/requirejs-tpl/tpl',
        json: '../bower_components/requirejs-json/json',
    },

    shim: {
        jquery: {
            exports: '$'
        },
        lodash: {
            exports: '_'
        }
    }
});

