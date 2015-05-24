declare var requirejs: Require;
interface moduleStatic{
    exports:Object
}
declare var module: moduleStatic;

if (typeof module !== 'undefined' && module.exports) {
  requirejs = require('requirejs');
  requirejs.config({
    nodeRequire: require
  });
}else{
    requirejs = require;
}
/**
 * Application configuration declaration.
 */
requirejs.config({

    baseUrl: 'assets/scripts/',

    paths: {
        //main libraries
        jquery: '../vendor/jquery/jquery-1.9.1',
        lodash: '../vendor/lodash/lodash',
        knockout: '../vendor/knockout/knockout-3.3.0',
        template: '../vendor/knockout-require-templates/template',
        stringTemplateEngine: '../vendor/knockout-require-templates/stringTemplateEngine',

        //shortcut paths
        templates: '../templates',
        data: '../data',

        //require plugins
        text: '../vendor/require/text',
        tpl: '../vendor/require/tpl',
        json: '../vendor/require/json',
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