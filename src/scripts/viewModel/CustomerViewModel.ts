import ko = require("knockout");
'use strict';

function CustomerViewModel(customer){
    var isDirty = ko.observable(false);
    var self = this;
    Object.defineProperty(this, "isDirty", {
        get: isDirty,
        set: isDirty
    });
    //this.model = customer;
    Object.defineProperty(this, "firstName", {
        get: () => { return customer.firstName; },
        set: (value) => {
            isDirty(true);
            customer.firstName = value;
        }
    });
    Object.defineProperty(this, "lastName", {
        get: () => { return customer.lastName; },
        set: (value) => {
            isDirty(true);
            customer.lastName = value;
        }
    });
}
export = CustomerViewModel;
