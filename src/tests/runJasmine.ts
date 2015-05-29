///<reference path="CustomerViewModelTests.ts"/>
///<reference path="MainViewModelTests.ts"/>
///<reference path="DataServiceTests.ts"/>
///<reference path="../assets/scripts/MVVMDemo2.ts"/>
'use strict';

require.config({
  paths: {
    'jasmine': '../vendor/jasmine/jasmine',
    'tests': '../../tests'
  }
});

require(['require', 'exports', 'jquery', 'MVVMDemo2', 'tests/CustomerViewModelTests', 'tests/MainViewModelTests', 'tests/DataServiceTests'], () => {
    console.log('run!');
});
