/// <reference path="../../_declare/require.d.ts" />

/// <reference path='config.ts'/>
/// <reference path='MVVMDemo2.ts'/>

import {App} from "MVVMDemo2";
/**
 * Main entry point for RequireJS
 */
require(['jquery','lodash'],
    ($) => {
        'use strict';
        $(document).ready(function () {
            var app = new App();
            app.init($('body')[0]);
        });
    }
);