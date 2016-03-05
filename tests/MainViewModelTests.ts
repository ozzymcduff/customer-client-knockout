/* global define, describe, it, beforeEach */
/// <reference path="../_declare/jasmine.d.ts" />
/// <reference path="../_declare/bluebird.d.ts" />
/// <reference path="../_declare/knockout.d.ts" />
/// <reference path="../app/viewModel/mainViewModel.ts" />
'use strict';
describe('load data', ()=> {
  let ko = require("knockout");
  let Promise = require("bluebird");

  let mvm: Demo.ViewModel.MainViewModel;
  let service: Demo.Model.IDataService;

  class FakeDataService implements Demo.Model.IDataService {
      getCustomers() {
          return Promise.resolve([{
              firstName: 'Oskar',
              lastName: 'Gewalli'
          }]);
      }
      saveCustomer(c:any) {
          return Promise.fail('!');
      }
  }
  beforeEach(()=> {
    service = new FakeDataService();
    mvm = new Demo.ViewModel.MainViewModel(service);
  });
  describe('isBusy', ()=> {
    it('should not be isBusy by default', ()=> {
      expect(mvm.isBusy).toEqual(false);
    });
  });
  describe('refreshCommand', ()=> {
    it('should be able to parse customer', (done)=> {
      mvm.refreshCommand().then((customers)=> {
        expect(customers.length).toEqual(1);
        var customer = customers[0];
        expect(customer.firstName).toEqual('Oskar');
        expect(customer.lastName).toEqual('Gewalli');
        done();
      });
    });
  });
});

describe('saveCustomerCommand', ()=> {
  let ko = require("knockout");
  let Promise = require("bluebird");

  let mvm: Demo.ViewModel.MainViewModel;
  let service: FakeDataService;
  let refreshed: Promise<Array<Demo.ViewModel.CustomerViewModel>>;

  class FakeDataService implements Demo.Model.IDataService {
      public savedCustomers:Array<any> = [];

      getCustomers() {
          return Promise.resolve([{
              firstName: 'Hugo',
              lastName: 'Larssen'
          }]);
      }
      saveCustomer(customer: any) {
          this.savedCustomers.push(customer);
          return Promise.resolve({
              data: '<something>'
          });
      }
  }

  beforeEach(()=> {
    service = new FakeDataService();
    mvm = new Demo.ViewModel.MainViewModel(service);
    refreshed = mvm.refreshCommand();
  });

  it('should be able to save customer directly after editing the name', (done)=> {
    refreshed.then(()=> {
      var customer = mvm.customers[0];
      var subscription = ko.computed(()=> {
        return mvm.isBusy;
      }).subscribe((isBusy:boolean)=>{
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

