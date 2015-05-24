'use strict';
require.config({
  paths: {
    'mocha': '../vendor/mocha/mocha',
    'chai': '../vendor/chai/chai',
    'tests': '../../tests'
  },
  shim: {
    'mocha': {
      exports: 'mocha'
    }
  }
});
require(['require', 'exports', 'MVVMDemo2', 'mocha'], function startMocha(require, exports) {
  var mocha = require('mocha');
  mocha.setup('bdd');
  require(['tests/CustomerViewModelTests', 'tests/MainViewModelTests', 'tests/DataServiceTests'], function() {
    mocha.checkLeaks();
    mocha.globals([]);
    mocha.run();
  });
});