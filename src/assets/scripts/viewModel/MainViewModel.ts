/// <reference path="../_declare/require.d.ts" />
/// <reference path="../_declare/bluebird.d.ts" />
/// <reference path="CustomerViewModel.ts"/>
/// <amd-dependency path="viewModel/CustomerViewModel" />
/// <amd-dependency path="bluebird" />

import ko = require("knockout");
import Promise = require("bluebird");
import CustomerViewModel = require("viewModel/CustomerViewModel");

function MainViewModel(service){
    var self = this;
    var customers = ko.observableArray([]);
    var isBusy = ko.observable(false);
    Object.defineProperty(this, "customers", {
        get: function(){ return customers(); }
    });
    Object.defineProperty(this, "isBusy", {
        get: isBusy,
        set: isBusy
    });

    function allDirtyCustomers(){
        return customers().filter(function(customer) {
            return customer.isDirty;
        });
    }
    
    var subscription = ko.computed(allDirtyCustomers).subscribe(function(customersToSave) {
        if (customersToSave.length>0){
            customersToSave.forEach(function(customer) {
                self.saveCustomerCommand(customer);
            });
        }
    });

    this.saveCustomerCommand = function(customer) : Promise<Boolean>{
        if (!isBusy() && customer.isDirty){
            isBusy(true);

            return service.saveCustomer(customer).then(function (result){ 
                customer.isDirty = false;
                isBusy(false);
                return result;
            }).catch(function() {
                isBusy(false);
            });
        }else{
            console.log('busy');

            return Promise.resolve(false);
        }
    };

    this.refreshCommand = function() : Promise<Array<any>>{ 
        if (isBusy() ){
            console.log('busy');
            return Promise.resolve(customers());
        }
        isBusy(true);
        return service.getCustomers().then(function (data) {
            isBusy(false);
            customers(data.map(function(model) {
                return new CustomerViewModel(model);
            }));
            return customers();
        }).catch(function(jqXHR, textStatus, errorThrown) {
            isBusy(false);
            // Display error, normally this would be done through a property
            alert(errorThrown);
        });
    };

}
export = MainViewModel;
