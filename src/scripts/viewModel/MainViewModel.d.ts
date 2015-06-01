/// <reference path="CustomerViewModel.d.ts"/>
/// <reference path="../_declare/bluebird.d.ts" />

declare class MainViewModel {
    constructor(service: any);
    customers: Array<CustomerViewModel>;
    isBusy: boolean;
    saveCustomerCommand(customer: CustomerViewModel): Promise<Boolean>;
    refreshCommand(): Promise<Array<CustomerViewModel>>;
}

declare module 'MainViewModel' {
    export = MainViewModel;
}