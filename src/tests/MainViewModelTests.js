/* global describe, it, beforeEach */
'use strict';
if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}
define(['require', 'exports', 'chai', 'viewModel/MainViewModel'], function tests(require, exports, chai, MainViewModel) {
  chai.should();
  describe('MainViewModel', function () {
    var mvm;
    var service;
    beforeEach(function () {
      service = {};
      mvm = new MainViewModel(service);
    });
    describe('isBusy', function () {
      it('should not be isBusy by default', function () {
        mvm.isBusy.should.equal(false);
      });
    });
  });
});