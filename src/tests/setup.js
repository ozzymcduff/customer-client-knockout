'use strict';
var requirejs;
if (typeof module !== 'undefined' && module.exports) {
  requirejs = require('requirejs');
  requirejs.config({
    nodeRequire: require
  });
  require('../assets/scripts/config.js');
  requirejs.config({
    baseUrl: 'src/assets/scripts/',
  });
  requirejs.config({
    paths: {
      'jquery': 'jquery',
    }
  });
} else {
  requirejs = require;
}
requirejs.config({
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
requirejs(['require', 'exports', 'MVVMDemo2', 'mocha'], function startMocha(require, exports) {
  var mocha = require('mocha');
  //if ('setup' in mocha) {
  mocha.setup('bdd');
  //}
  require(['tests/CustomerViewModelTests', 'tests/MainViewModelTests'], function () {
    mocha.checkLeaks();
    mocha.globals([]);
    mocha.run();
    console.log('Q');
  });
});