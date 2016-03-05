/// <reference path="../../../_declare/require.d.ts" />
/// <reference path="../../../_declare/bluebird.d.ts" />
/// <amd-dependency path="knockout" />
var ko = require("knockout");
export interface ICustomerViewModel { 
    isDirty:boolean;
    firstName:string;
    lastName:string;
}

export class CustomerViewModel implements ICustomerViewModel {
    private _isDirty = ko.observable(false);
    private _customer;
    public isDirty;
    constructor(customer) {
        this._customer = customer;
        Object.defineProperties(this,{
            isDirty:{get:this._isDirty, set:this._isDirty}
        });
    }
    get firstName() { return this._customer.firstName; }
    set firstName(value) { this._customer.firstName = value; this.isDirty = true; }
    get lastName() { return this._customer.lastName; }
    set lastName(value) { this._customer.lastName = value; this.isDirty = true; }
}