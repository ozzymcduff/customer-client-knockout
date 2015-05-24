/// <reference path="../_declare/require.d.ts" />
/// <reference path="CustomerViewModel.ts"/>
/// <amd-dependency path="viewModel/CustomerViewModel" />

import ko = require("knockout");
var CustomerViewModel = require("viewModel/CustomerViewModel");

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

    this.saveCustomerCommand = function(customer){
        if (!isBusy() && customer.isDirty){
            isBusy(true);

            return service.saveCustomer(customer, function (result){ 
                customer.isDirty = false;
            }).complete(function() {
                isBusy(false);
            });
        }
        return null;
    };

    this.refreshCommand = function(){
        if (isBusy() ){
            return null;
        }
        isBusy(true);
        return service.getCustomers(function (data) {
            customers(data.map(function(model) {
                return new CustomerViewModel(model, self.saveCustomerCommand);
            }));
        }).fail(function(jqXHR, textStatus, errorThrown) {
            // Display error, normally this would be done through a property
            alert(errorThrown);
        }).complete(function(){
            isBusy(false);
        });
    };

}
export = MainViewModel;
