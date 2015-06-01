/* global define, describe, it, beforeEach */
/// <reference path="../_declare/bluebird.d.ts" />
/// <reference path="../_declare/jquery.d.ts" />
/// <reference path="../_declare/knockout.d.ts" />
/// <reference path="../viewModel/MainViewModel.d.ts" />
/// <amd-dependency path="bluebird" />
/// <amd-dependency path="jquery" />
/// <amd-dependency path="viewModel/MainViewModel" />
'use strict';
import ko = require("knockout");
import Promise = require('bluebird');
import $ = require('jquery');
import MainViewModel = require('viewModel/MainViewModel');

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
      expect(mvm.isBusy).toEqual(false);
    });
  });
  describe('refreshCommand', function() {
    it('should be able to parse customer', function(done) {
      mvm.refreshCommand().then(function(customers) {
        expect(customers.length).toEqual(1);
        var customer = customers[0];
        expect(customer.firstName).toEqual('Oskar');
        expect(customer.lastName).toEqual('Gewalli');
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
          expect(mvm.isBusy).toEqual(false);
          expect(customer.isDirty).toEqual(false);
          expect(service.savedCustomers.length).toEqual(1);
          expect(service.savedCustomers[0]).toEqual(customer);
          done();
        }
      });
      customer.firstName = 'Jan';
      expect(customer.isDirty).toEqual(true);
    });
  });
});
