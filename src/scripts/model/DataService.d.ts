/// <reference path="../_declare/bluebird.d.ts" />

declare class DataService {
    constructor(endpoint: any, ajax: any);
    getCustomers(): Promise<Array<Object>>;
    saveCustomer(model: any): Promise<any>;
}
declare module 'DataService' {
    export = DataService;
}