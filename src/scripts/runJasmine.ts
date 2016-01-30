///<reference path="tests/CustomerViewModelTests.ts"/>
///<reference path="tests/MainViewModelTests.ts"/>
///<reference path="tests/DataServiceTests.ts"/>
///<reference path="MVVMDemo2.ts"/>
'use strict';

require.config({
  paths: {
    'jasmine': '/bower_components/jasmine-core/lib/jasmine-core',
    'tests': '/scripts/tests'
  }
});

require(['require', 'exports', 'jquery', 'MVVMDemo2', 'tests/CustomerViewModelTests', 'tests/MainViewModelTests', 'tests/DataServiceTests'], () => {
    console.log('run!');
});
