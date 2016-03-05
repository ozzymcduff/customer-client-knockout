/// <reference path="../../_declare/require.d.ts" />
/// <reference path="../../_declare/bluebird.d.ts" />
/// <reference path="../../_declare/knockout.d.ts" />
/// <reference path="./customerViewModel.ts" />

module Demo.ViewModel {

    export class MainViewModel {
        private _customers = ko.observableArray([]);
        private _isBusy = ko.observable(false);
        private _service: Model.IDataService;
        constructor(service: Model.IDataService) {
            this._service = service;
            var subscription = ko.pureComputed(this._allDirtyCustomers, this)
                .subscribe(this._saveCustomers.bind(this));
        }
        private _allDirtyCustomers() {
            return this.customers.filter((customer) => customer.isDirty);
        }

        private _saveCustomers(customersToSave: Array<CustomerViewModel>) {
            if (customersToSave.length > 0) {
                customersToSave.forEach((customer) => {
                    this.saveCustomerCommand(customer);
                });
            }
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
                alert(`Could not refresh due to error: ${errorThrown}`);
            });
            return promise;
        }

        saveCustomerCommand(customer: CustomerViewModel) : Promise<boolean> {
            if (!this._isBusy() && customer.isDirty) {
                this._isBusy(true);

                let promise = this._service.saveCustomer(customer).then((result: any) => {
                    customer.isDirty = false;
                    this._isBusy(false);
                    return result;
                });
                promise.catch(() => {
                    this._isBusy(false);
                });
                return promise;
            } else {
                return Promise.resolve(false);
            }
        };
    }
}
