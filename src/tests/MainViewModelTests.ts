/* global define, describe, it, beforeEach */
///<reference path="../assets/scripts/_declare/mocha.d.ts"/>

'use strict';
define(['require', 'exports', 'chai', 'viewModel/MainViewModel', 'bluebird', 'knockout'], function tests(require, exports, chai, MainViewModel) {
  chai.should();
  var $ = require('jquery');
  var ko = require('knockout');
  var Promise = require('bluebird');
  describe('load data', function() {
    var mvm;
    var service;
    beforeEach(function() {
      service = {
        getCustomers: function() {
          return Promise.resolve([{
            firstName: 'Oskar',
            lastName: 'Gewalli'
          }]);
        }
      };
      mvm = new MainViewModel(service);
    });
    describe('isBusy', function() {
      it('should not be isBusy by default', function() {
        mvm.isBusy.should.equal(false);
      });
    });
    describe('refreshCommand', function() {
      it('should be able to parse customer', function(done) {
        mvm.refreshCommand().then(function(customers) {
          customers.length.should.equal(1);
          var customer = customers[0];
          customer.firstName.should.equal('Oskar');
          customer.lastName.should.equal('Gewalli');
          done();
        });
      });
    });
  });
  describe('saveCustomerCommand', function() {
    var mvm;
    var service;
    var refreshed;
    beforeEach(function() {
      service = {
        getCustomers: function() {
          return Promise.resolve([{
            firstName: 'Hugo',
            lastName: 'Larssen'
          }]);
        },
        savedCustomers: [],
        saveCustomer: function(customer) {
          service.savedCustomers.push(customer);
          return Promise.resolve({
            data: '<something>'
          });
        }
      };
      mvm = new MainViewModel(service);
      refreshed = mvm.refreshCommand();
    });
    it('should be able to save customer directly after editing the name', function(done) {
      refreshed.then(function() {
        var customer = mvm.customers[0];
        var subscription = ko.computed(function() {
          return mvm.isBusy;
        }).subscribe(function(isBusy) {
          if (!isBusy) {
            mvm.isBusy.should.equal(false);
            customer.isDirty.should.equal(false);
            service.savedCustomers.length.should.equal(1);
            service.savedCustomers[0].should.equal(customer);
            done();
          }
        });
        customer.firstName = 'Jan';
        customer.isDirty.should.equal(true);
      });
    });
  });
});