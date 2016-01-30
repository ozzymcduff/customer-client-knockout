/// <reference path="../../../_declare/require.d.ts" />
/// <reference path="../../../_declare/bluebird.d.ts" />
/// <amd-dependency path="bluebird" />
/// <amd-dependency path="knockout" />

import Promise = require("bluebird");
import {CustomerViewModel} from "./CustomerViewModel"
var ko = require("knockout");

export class MainViewModel {
    private _customers = ko.observableArray([]);
    private _isBusy = ko.observable(false);
    private _service;
    private _allDirtyCustomers() {
        return this._customers().filter(function(customer) {
            return customer.isDirty;
        });
    }
    constructor(service) {
        this._service = service;
        var subscription = ko.pureComputed(this._allDirtyCustomers, this).subscribe((customersToSave) => {
            if (customersToSave.length > 0) {
                customersToSave.forEach((customer) => {
                    this.saveCustomerCommand(customer);
                });
            }
        });
    }
    get customers(): Array<CustomerViewModel> { return this._customers(); }
    get isBusy(): boolean { return this._isBusy(); }
    refreshCommand(): Promise<Array<CustomerViewModel>> {
        if (this._isBusy()) {
            return Promise.resolve(this._customers());
        }
        this._isBusy(true);
        var promise = this._service.getCustomers().then((data) => {
            this._isBusy(false);
            this._customers(data.map((model) => {
                return new CustomerViewModel(model);
            }));
            return this._customers();
        });
        promise.catch((errorThrown) => {
            this._isBusy(false);
            // Display error, normally this would be done through a property
            alert(errorThrown);
        });
        return promise;
    }

    saveCustomerCommand(customer: CustomerViewModel) {
        if (!this._isBusy() && customer.isDirty) {
            this._isBusy(true);

            return this._service.saveCustomer(customer).then((result) => {
                customer.isDirty = false;
                this._isBusy(false);
                return result;
            }).catch(() => {
                this._isBusy(false);
            });
        } else {
            return Promise.resolve(false);
        }
    };
}
