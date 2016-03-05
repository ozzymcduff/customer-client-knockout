/// <reference path="../../_declare/require.d.ts" />
/// <reference path="../../_declare/knockout.d.ts" />
module Demo.ViewModel {
    var ko = require("knockout");

    export class CustomerViewModel {
        private _isDirty = ko.observable(false);
        private _customer;
        constructor(customer) {
            this._customer = customer;
        }
        get isDirty() { return this._isDirty(); }
        set isDirty(value) { this._isDirty(value); }

        get firstName() { return this._customer.firstName; }
        set firstName(value) { this._customer.firstName = value; this.isDirty = true; }
        
        get lastName() { return this._customer.lastName; }
        set lastName(value) { this._customer.lastName = value; this.isDirty = true; }
    }
}