/// <reference path="_declare/require.d.ts" />

///<reference path='config.ts'/>
///<reference path='MVVMDemo2.ts'/>

/**
 * Main entry point for RequireJS
 */
require(
    [
        'MVVMDemo2',
        'jquery'
    ],
    (MVVMDemo2, $) => {
        'use strict';

        $(document).ready(function () {
            var app = new MVVMDemo2();
            app.init($('body')[0]);
        });
    }
);