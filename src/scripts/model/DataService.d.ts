/// <reference path="../_declare/bluebird.d.ts" />
/// <reference path="../viewModel/CustomerViewModel.d.ts"/>

declare class DataService {
    constructor(endpoint: any, ajax: any);
    getCustomers(): Promise<Array<CustomerViewModel>>;
    saveCustomer(model: CustomerViewModel): Promise<any>;
}
declare module 'DataService' {
    export = DataService;
}