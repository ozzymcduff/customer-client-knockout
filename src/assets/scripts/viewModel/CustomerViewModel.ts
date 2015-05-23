define(["knockout"], function (ko){ 
    "use strict";
    function CustomerViewModel(customer){
        var isDirty = ko.observable(false);
        var self = this;
        Object.defineProperty(this, "isDirty", {
            get: isDirty,
            set: isDirty
        });
        //this.model = customer;
        Object.defineProperty(this, "firstName", {
            get: function() { return customer.firstName; },
            set: function (value) {
                isDirty(true);
                customer.firstName = value;
            }
        });
        Object.defineProperty(this, "lastName", {
            get: function() { return customer.lastName; },
            set: function (value) {
                isDirty(true);
                customer.lastName = value;
            }
        });
    }
    return CustomerViewModel;
});