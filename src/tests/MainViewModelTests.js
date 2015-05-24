/* global describe, it, beforeEach */
'use strict';
if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}
define(['require', 'exports', 'chai', 'viewModel/MainViewModel', 'model/DataService'], function tests(require, exports, chai, MainViewModel) {
  chai.should();
  var $ = require('jquery');
  var DataService = require('model/DataService');
  describe('MainViewModel', function () {
    var mvm;
    var service;
    beforeEach(function () {
      service = new DataService({
        getAllCustomers: 'tests/GetAllCustomers.xml'
      });
      mvm = new MainViewModel(service);
    });
    describe('isBusy', function () {
      it('should not be isBusy by default', function () {
        mvm.isBusy.should.equal(false);
      });
    });
    describe('refreshCommand', function () {
      it('should be able to parse customer', function (done) {
        mvm.refreshCommand().done(function () {
          mvm.customers.length.should.equal(1);
          var customer = mvm.customers[0];
          customer.firstName.should.equal('Oskar');
          customer.lastName.should.equal('Gewalli');
          done();
        });
      });
    });
  });
});