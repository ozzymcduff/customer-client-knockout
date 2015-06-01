/// <reference path="../_declare/require.d.ts" />
/// <reference path="../_declare/bluebird.d.ts" />
/// <reference path="CustomerViewModel.d.ts"/>
/// <amd-dependency path="bluebird" />
'use strict';
import ko = require("knockout");
import Promise = require("bluebird");
import CustomerViewModel = require("viewModel/CustomerViewModel");

function MainViewModel(service) {
    var self = this;
    var customers = ko.observableArray([]);
    var isBusy = ko.observable(false);
    Object.defineProperty(this, "customers", {
        get: () => { return customers(); }
    });
    Object.defineProperty(this, "isBusy", {
        get: isBusy,
        set: isBusy
    });

    function allDirtyCustomers() {
        return customers().filter(function(customer) {
            return customer.isDirty;
        });
    }

    var subscription = ko.computed(allDirtyCustomers).subscribe((customersToSave) => {
        if (customersToSave.length > 0) {
            customersToSave.forEach((customer) => {
                self.saveCustomerCommand(customer);
            });
        }
    });

    this.saveCustomerCommand = (customer) => {
        if (!isBusy() && customer.isDirty) {
            isBusy(true);

            return service.saveCustomer(customer).then((result) => {
                customer.isDirty = false;
                isBusy(false);
                return result;
            }).catch(() => {
                isBusy(false);
            });
        } else {
            return Promise.resolve(false);
        }
    };

    this.refreshCommand = () => {
        if (isBusy()) {
            return Promise.resolve(customers());
        }
        isBusy(true);
        return service.getCustomers().then((data) => {
            isBusy(false);
            customers(data.map((model) => {
                return new CustomerViewModel(model);
            }));
            return customers();
        }).catch((errorThrown) => {
            isBusy(false);
            // Display error, normally this would be done through a property
            alert(errorThrown);
        });
    };

}
export = MainViewModel;
